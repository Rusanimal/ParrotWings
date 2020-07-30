using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ParrotWings.Data;
using ParrotWings.Data.Managers.Interfaces;
using ParrotWings.Data.Models;
using ParrotWings.Extensions;
using System.Threading.Tasks;

namespace ParrotWings.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionManager _transactionManager;
        private readonly ILogger<TransactionController> _logger;
        public TransactionController(ITransactionManager transactionManager, ILogger<TransactionController> logger)
        {
            _transactionManager = transactionManager;
            _logger = logger;
        }

        [HttpGet("GetTransaction/{id}")]
        public async Task<IActionResult> GetTransaction(int id)
        {
            var userId = User.Identity.GetUserId();
            return Ok(await _transactionManager.GetTransitionCopy(id, userId));
        }

        [HttpPost("CreateTransaction")]
        public async Task<IActionResult> CreateTransaction(CreateTransactionModel model)
        {
            if(model.Amount <= 0)
            {
                return BadRequest(ErrorDictionary.AmountMustByPositive);
            }
            var userId = User.Identity.GetUserId();
            var result = await _transactionManager.CreateTransaction(userId, model);
            if (string.Equals(result, ErrorDictionary.Ok))
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

    }
}
