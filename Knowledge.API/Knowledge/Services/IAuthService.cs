namespace Knowledge.Services
{
    using System.Threading.Tasks;

    using Knowledge.Models.Domain;
    using Knowledge.Models.Dto;

    public interface IAuthService
    {
        Task<string> Login(LoginDto login);

        Task Register(RegisterDto login);
    }
}