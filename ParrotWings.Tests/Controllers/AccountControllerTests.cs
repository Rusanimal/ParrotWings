using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using ParrotWings.Controllers;
using ParrotWings.Data;
using ParrotWings.Data.Managers.Interfaces;
using ParrotWings.Data.Models;
using ParrotWings.Tests.FakeFactories;
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
    public class AccountControllerTests
    {
        private readonly AccountController _controller;
        private readonly Mock<IUserManager> _userManager;
        private readonly Mock<ILogger<AccountController>> _logger;
        public AccountControllerTests()
        {
            var authenticationServiceMock = new Mock<IAuthenticationService>();
            authenticationServiceMock
                .Setup(a => a.SignInAsync(It.IsAny<HttpContext>(), It.IsAny<string>(), It.IsAny<ClaimsPrincipal>(), It.IsAny<AuthenticationProperties>()))
                .Returns(Task.CompletedTask);

            var serviceProviderMock = new Mock<IServiceProvider>();
            serviceProviderMock
                .Setup(s => s.GetService(typeof(IAuthenticationService)))
                .Returns(authenticationServiceMock.Object);

            _userManager = new Mock<IUserManager>(MockBehavior.Strict);
            _logger = new Mock<ILogger<AccountController>>(MockBehavior.Strict);
            _controller = new AccountController(_userManager.Object, _logger.Object);
            _controller.ControllerContext = new ControllerContext();
            _controller.ControllerContext.HttpContext = new DefaultHttpContext() { RequestServices = serviceProviderMock.Object };
            
        }

        [Theory]
        [AutoMoqData]
        public async Task Register_Success(RegistrationModel model)
        {
            _userManager.Setup(c => c.GetUserByEmail(It.IsAny<string>())).ReturnsAsync((UserModel)null);
            _userManager.Setup(c => c.RegisterUser(It.IsAny<RegistrationModel>())).ReturnsAsync(ErrorDictionary.Ok);

            var response = await _controller.Register(model) as OkResult;

            Assert.True(response.StatusCode == (int)HttpStatusCode.OK);
        }

        [Theory]
        [AutoMoqData]
        public async Task Register_Already_Registered_Bad_Request(RegistrationModel model, UserModel user)
        {
            _userManager.Setup(c => c.GetUserByEmail(It.IsAny<string>())).ReturnsAsync(user);

            var response = await _controller.Register(model) as BadRequestObjectResult;

            Assert.True(response.StatusCode == (int)HttpStatusCode.BadRequest);
            Assert.True(((string)response.Value).Equals(ErrorDictionary.AlreadyRegisteredUser));
        }

        [Theory]
        [AutoMoqData]
        public async Task Register_Error(RegistrationModel model)
        {
            _userManager.Setup(c => c.GetUserByEmail(It.IsAny<string>())).ReturnsAsync((UserModel)null);
            _userManager.Setup(c => c.RegisterUser(It.IsAny<RegistrationModel>())).ReturnsAsync(ErrorDictionary.Error);

            var response = await _controller.Register(model) as BadRequestObjectResult;

            Assert.True(response.StatusCode == (int)HttpStatusCode.BadRequest);
            Assert.True(((string)response.Value).Equals(ErrorDictionary.Error));
        }

        [Theory]
        [AutoMoqData]
        public async Task Login_Success(LoginModel model, UserInfoModel userInfoModel)
        {
            _userManager.Setup(c => c.Login(model)).ReturnsAsync(userInfoModel);

            var response = await _controller.Login(model) as OkResult;

            Assert.True(response.StatusCode == (int)HttpStatusCode.OK);
        }

        [Theory]
        [AutoMoqData]
        public async Task Login_Error(LoginModel model)
        {
            _userManager.Setup(c => c.Login(model)).ReturnsAsync((UserInfoModel)null);

            var response = await _controller.Login(model) as BadRequestObjectResult;

            Assert.True(response.StatusCode == (int)HttpStatusCode.BadRequest);
            Assert.Equal((string)response.Value, ErrorDictionary.LoginError);
        }

        [Fact]
        public async Task Logout_Success()
        {
            var response = await _controller.Logout() as OkResult;

            Assert.True(response.StatusCode == (int)HttpStatusCode.OK);
        }
    }
}
