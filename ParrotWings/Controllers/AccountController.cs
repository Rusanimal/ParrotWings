using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ParrotWings.Data;
using ParrotWings.Data.Managers.Interfaces;
using ParrotWings.Data.Models;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ParrotWings.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IUserManager _userManager;
        private readonly ILogger<AccountController> _logger;

        public AccountController(IUserManager userManager, ILogger<AccountController> logger)
        {
            _userManager = userManager;
            _logger = logger;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegistrationModel model)
        {
            var user = await _userManager.GetUserByEmail(model.Email);
            if (user != null)
            {
                return BadRequest(ErrorDictionary.AlreadyRegisteredUser);
            }

            var result = await _userManager.RegisterUser(model);
            if (string.Equals(result, ErrorDictionary.Ok))
            {
                return Ok();
            }
            return BadRequest(result);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var result = await _userManager.Login(model);
            if (result != null)
            {
                var claims = new List<Claim>();
                claims.Add(new Claim(ClaimsIdentity.DefaultNameClaimType, result.Name));
                claims.Add(new Claim(ClaimTypes.NameIdentifier, result.Id.ToString()));

                var id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
                return Ok();
            }

            return BadRequest(ErrorDictionary.LoginError);
        }

        [HttpGet("Logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok();
        }
    }
}
