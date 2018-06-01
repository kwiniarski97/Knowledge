namespace Knowledge.Controllers
{
    using System.Threading.Tasks;

    using Knowledge.Models.Domain;
    using Knowledge.Models.Dto;
    using Knowledge.Services;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [AllowAnonymous]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private IAuthService authService;

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto login)
        {
            var jwt = await this.authService.Login(login);
            return this.Ok(jwt);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto register)
        {
            await this.authService.Register(register);
            return this.Ok();
        }
    }
}