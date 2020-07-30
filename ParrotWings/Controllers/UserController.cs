using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ParrotWings.Data;
using ParrotWings.Data.Managers.Interfaces;
using ParrotWings.Extensions;
using System.Threading.Tasks;

namespace ParrotWings.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IBalanceManager _balanceManager;
        private readonly IUserManager _userManager;

        private readonly ILogger<UserController> _logger;

        public UserController(IBalanceManager balanceManager,
            IUserManager userManager, ILogger<UserController> logger)
        {
            _balanceManager = balanceManager;
            _userManager = userManager;
            _logger = logger;
        }

        [HttpGet("GetUserInfo")]
        public async Task<IActionResult> GetUserInfo()
        {
            var id = User.Identity.GetUserId();
            var result = await _userManager.GetUserInfo(id);
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest(ErrorDictionary.Error);
        }

        [HttpGet("GetUsers")]
        public async Task<IActionResult> GetUsers()
        {
            var id = User.Identity.GetUserId();
            return Ok(await _userManager.GetUsersWithoutId(id));
        }

        [HttpGet("GetBalance")]
        public async Task<IActionResult> GetBalance()
        {
            var id = User.Identity.GetUserId();
            return Ok(await _balanceManager.GetBalance(id));
        }

        [HttpGet("CheckUserBalance/{amount}")]
        public async Task<IActionResult> CheckUserBalance(decimal amount)
        {
            var id = User.Identity.GetUserId();
            return Ok(await _balanceManager.CheckBalance(id, amount));
        }

        [HttpGet("GetBalanceHistory")]
        public async Task<IActionResult> GetBalanceHistory()
        {
            var id = User.Identity.GetUserId();
            return Ok(await _balanceManager.GetHistoryBalance(id));
        }
    }
}
