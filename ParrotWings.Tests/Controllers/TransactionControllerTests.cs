using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using ParrotWings.Controllers;
using ParrotWings.Data;
using ParrotWings.Data.Managers.Interfaces;
using ParrotWings.Data.Models;
using ParrotWings.Tests.FakeFactories;
using SemanticComparison.Fluent;
using System.Collections.Generic;
using System.Net;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using Xunit;

namespace ParrotWings.Tests.Controllers
{
    public class TransactionControllerTests
    {
        private readonly TransactionController _controller;
        private readonly Mock<ITransactionManager> _transactionManager;
        private readonly Mock<ILogger<TransactionController>> _logger;
        private readonly Mock<IPrincipal> _mockPrincipal;
        public TransactionControllerTests()
        {
            _transactionManager = new Mock<ITransactionManager>(MockBehavior.Strict);
            _logger = new Mock<ILogger<TransactionController>>(MockBehavior.Strict);
            _controller = new TransactionController(_transactionManager.Object, _logger.Object);
            _controller.ControllerContext = new ControllerContext();
            _controller.ControllerContext.HttpContext = new DefaultHttpContext();
            _mockPrincipal = new Mock<IPrincipal>();

            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.NameIdentifier, "1"));

            _mockPrincipal.Setup(c => c.Identity).Returns(new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType));
        }

        [Theory]
        [AutoMoqData]
        public async Task GetTransaction_Success(CreateTransactionModel model)
        {
            _transactionManager.Setup(c => c.GetTransitionCopy(It.IsAny<int>(), It.IsAny<int>())).ReturnsAsync(model);

            var response = await _controller.GetTransaction(1) as OkObjectResult;
            var received = response.Value.AsSource().OfLikeness<CreateTransactionModel>();

            Assert.True(response.StatusCode == (int)HttpStatusCode.OK);
            Assert.True(received.Equals(model));
        }

        [Theory]
        [AutoMoqData]
        public async Task CreateTransaction_Success(CreateTransactionModel model)
        {
            _transactionManager.Setup(c => c.CreateTransaction(It.IsAny<int>(), It.IsAny<CreateTransactionModel>())).ReturnsAsync(ErrorDictionary.Ok);

            var response = await _controller.CreateTransaction(model) as OkObjectResult;

            Assert.True(response.StatusCode == (int)HttpStatusCode.OK);
            Assert.Equal((string)response.Value, ErrorDictionary.Ok);
        }

        [Theory]
        [AutoMoqData]
        public async Task CreateTransaction_Amount_Negative_Error(CreateTransactionModel model)
        {
            model.Amount = -1;

            var response = await _controller.CreateTransaction(model) as BadRequestObjectResult;

            Assert.True(response.StatusCode == (int)HttpStatusCode.BadRequest);
            Assert.Equal((string)response.Value, ErrorDictionary.AmountMustByPositive);
        }

        [Theory]
        [AutoMoqData]
        public async Task CreateTransaction_Error(CreateTransactionModel model)
        {
            _transactionManager.Setup(c => c.CreateTransaction(It.IsAny<int>(), It.IsAny<CreateTransactionModel>())).ReturnsAsync(ErrorDictionary.Error);

            var response = await _controller.CreateTransaction(model) as BadRequestObjectResult;

            Assert.True(response.StatusCode == (int)HttpStatusCode.BadRequest);
            Assert.Equal((string)response.Value, ErrorDictionary.Error);
        }
    }
}
