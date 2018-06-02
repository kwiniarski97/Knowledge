namespace Knowledge.Services
{
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Security.Cryptography;
    using System.Text;
    using System.Threading.Tasks;

    using Knowledge.Models.Domain;
    using Knowledge.Models.Dto;
    using Knowledge.Repositories;
    using Knowledge.Settings;

    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;

    public class AuthService : IAuthService
    {
        private IUserRepository userRepository;

        private JwtSettings jwtSettings;

        public AuthService(IUserRepository userRepository, IOptions<JwtSettings> jwtSettings)
        {
            this.userRepository = userRepository;
            this.jwtSettings = jwtSettings.Value;
        }

        public async Task<string> Login(LoginDto login)
        {
            if (login.Nickname == null && login.Password == null)
            {
                throw new Exception("Podaj login i hasło");
            }

            var user = await this.userRepository.GetByNicknameAsync(login.Nickname);
            if (user == null)
            {
                throw new Exception("Nie znaleziono takiego użytkownika");
            }

            if (!this.VerifyPassword(login.Password, user.PasswordHash, user.Salt))
            {
                throw new Exception("Niepoprawne hasło");
            }

            var token = this.GenerateJwtToken(user);

            return token;
        }

        private bool VerifyPassword(string password, byte[] passwordHash, byte[] salt)
        {
            if (password == null)
            {
                throw new ArgumentNullException(nameof(password));
            }

            if (string.IsNullOrWhiteSpace(password))
            {
                throw new ArgumentException("Value cannot be empty or whitespace only string.", nameof(password));
            }

            if (passwordHash.Length != 64)
            {
                throw new ArgumentException(
                    "Invalid length of password hash (64 bytes expected).",
                    nameof(passwordHash));
            }

            if (salt.Length != 128)
            {
                throw new ArgumentException(
                    "Invalid length of password salt (128 bytes expected).",
                    nameof(passwordHash));
            }

            using (var hmac = new HMACSHA512(salt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                    {
                        return false;
                    }
                }
            }

            return true;
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.jwtSettings.Key);
            var tokenDescriptor = new SecurityTokenDescriptor
                                      {
                                          Subject = new ClaimsIdentity(
                                              new[]
                                                  {
                                                      new Claim(
                                                          JwtRegisteredClaimNames.Sub,
                                                          user.Nickname),
                                                      new Claim(
                                                          ClaimTypes.Role,
                                                          user.Role.ToString()),
                                                      new Claim(
                                                          "Status",
                                                          user.Status.ToString()),
                                                  }),
                                          Expires = DateTime.UtcNow.AddHours(1),
                                          SigningCredentials = new SigningCredentials(
                                              new SymmetricSecurityKey(key),
                                              SecurityAlgorithms.HmacSha256Signature)
                                      };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task Register(RegisterDto login)
        {
            this.GeneratePasswordHashAndSalt(login.Password, out var hash, out var salt);
            var user = new User { Email = login.Email, Nickname = login.Nickname, PasswordHash = hash, Salt = salt };
            await this.userRepository.AddAsync(user);
        }

        private void GeneratePasswordHashAndSalt(string password, out byte[] hash, out byte[] salt)
        {
            if (password == null)
            {
                throw new ArgumentNullException(nameof(password));
            }

            if (string.IsNullOrWhiteSpace(password))
            {
                throw new ArgumentNullException(nameof(password), "Password cannot be empty");
            }

            using (var hmac = new HMACSHA512())
            {
                salt = hmac.Key;
                hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }
    }
}