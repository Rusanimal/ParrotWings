using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using ParrotWings.Controllers;
using ParrotWings.Data;
using ParrotWings.Data.Managers.Interfaces;
using ParrotWings.Data.Models;
using ParrotWings.Data.Models.ParrotWings.Data.Models;
using ParrotWings.Tests.FakeFactories;
using SemanticComparison.Fluent;
using System;
using System.Collections.Generic;
using System.Net;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace ParrotWings.Tests.Controllers
{
    public class UserControllerTests
    {
        private readonly UserController _controller;
        private readonly Mock<IBalanceManager> _balanceManager;
        private readonly Mock<IUserManager> _userManager;
        private readonly Mock<ILogger<UserController>> _logger;
        private readonly Mock<IPrincipal> _mockPrincipal;
        public UserControllerTests()
        {
            _balanceManager = new Mock<IBalanceManager>(MockBehavior.Strict);
            _userManager = new Mock<IUserManager>(MockBehavior.Strict);
            _logger = new Mock<ILogger<UserController>>(MockBehavior.Strict);
            _controller = new UserController(_balanceManager.Object, _userManager.Object, _logger.Object);
            _controller.ControllerContext = new ControllerContext();
            _controller.ControllerContext.HttpContext = new DefaultHttpContext();
            _mockPrincipal = new Mock<IPrincipal>();

            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.NameIdentifier, "1"));

            _mockPrincipal.Setup(c => c.Identity).Returns(new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType));
        }

        [Theory]
        [AutoMoqData]
        public async Task GetUserInfo_Success(UserInfoModel model)
        {
            _userManager.Setup(c => c.GetUserInfo(It.IsAny<int>())).ReturnsAsync(model);

            var response = await _controller.GetUserInfo() as OkObjectResult;
            var received = response.Value.AsSource().OfLikeness<UserInfoModel>();

            Assert.True(response.StatusCode == (int)HttpStatusCode.OK);
            Assert.True(received.Equals(model));
        }

        [Fact]
        public async Task GetUserInfo_Error()
        {
            _userManager.Setup(c => c.GetUserInfo(It.IsAny<int>())).ReturnsAsync((UserInfoModel)null);

            var response = await _controller.GetUserInfo() as BadRequestObjectResult;

            Assert.True(response.StatusCode == (int)HttpStatusCode.BadRequest);
            Assert.Equal((string)response.Value, ErrorDictionary.Error);
        }

        [Theory]
        [AutoMoqData]
        public async Task GetUsers_Success(UserModel model1, UserModel model2)
        {
            var list = new List<UserModel>() { model1, model2 };
            _userManager.Setup(c => c.GetUsersWithoutId(It.IsAny<int>())).ReturnsAsync(list);

            var response = await _controller.GetUsers() as OkObjectResult;
            var received = response.Value.AsSource().OfLikeness<List<UserModel>>();

            Assert.True(response.StatusCode == (int)HttpStatusCode.OK);
            Assert.True(received.Equals(list));
        }

        [Theory]
        [AutoMoqData]
        public async Task GetBalance_Success(decimal balance)
        {
            _balanceManager.Setup(c => c.GetBalance(It.IsAny<int>())).ReturnsAsync(balance);

            var response = await _controller.GetBalance() as OkObjectResult;

            Assert.True(response.StatusCode == (int)HttpStatusCode.OK);
            Assert.True((decimal)response.Value == balance);
        }

        [Theory]
        [AutoMoqData]
        public async Task CheckUserBalance_Success(decimal amount)
        {
            _balanceManager.Setup(c => c.CheckBalance(It.IsAny<int>(), amount)).ReturnsAsync(true);

            var response = await _controller.CheckUserBalance(amount) as OkObjectResult;

            Assert.True(response.StatusCode == (int)HttpStatusCode.OK);
            Assert.True((bool)response.Value == true);
        }

        [Theory]
        [AutoMoqData]
        public async Task GetBalanceHistory_Success(TransitionModel model1, TransitionModel model2)
        {
            var list = new List<TransitionModel>() { model1, model2 };
            _balanceManager.Setup(c => c.GetHistoryBalance(It.IsAny<int>())).ReturnsAsync(list);

            var response = await _controller.GetBalanceHistory() as OkObjectResult;
            var received = response.Value.AsSource().OfLikeness<List<TransitionModel>>();

            Assert.True(response.StatusCode == (int)HttpStatusCode.OK);
            Assert.True(received.Equals(list));
        }
    }
}
