using AutoMapper;
using Moq;
using ParrotWings.Data;
using ParrotWings.Data.Entities;
using ParrotWings.Data.Helpers;
using ParrotWings.Data.Managers;
using ParrotWings.Data.Models;
using ParrotWings.Data.Profiles;
using ParrotWings.Data.Repositories.Interfaces;
using ParrotWings.Tests.FakeFactories;
using SemanticComparison.Fluent;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace ParrotWings.Tests.Managers
{
    public class UserManagerTests
    {
        private readonly UserManager _manager;
        private readonly Mock<IBalanceRepository> _balanceRepository;
        private readonly Mock<IUserRepository> _userRepository;
        public UserManagerTests()
        {
            var myProfile = new UserProfile();
            var configuration = new MapperConfiguration(cfg => cfg.AddProfile(myProfile));
            IMapper mapper = new Mapper(configuration);
            _balanceRepository = new Mock<IBalanceRepository>(MockBehavior.Strict);
            _userRepository = new Mock<IUserRepository>(MockBehavior.Strict);
            _manager = new UserManager(mapper, _balanceRepository.Object, _userRepository.Object);
        }

        [Fact]
        public async Task RegisterUser_Success()
        {
            _userRepository.Setup(c => c.AddUser(It.IsAny<User>())).ReturnsAsync(1);
            _balanceRepository.Setup(c => c.AddBalanceEntry(It.IsAny<Balance>())).ReturnsAsync(It.IsAny<int>());

            var result = await _manager.RegisterUser(It.IsAny<RegistrationModel>());

            Assert.True(result == ErrorDictionary.Ok);
        }

        [Fact]
        public async Task RegisterUser_Error()
        {
            _userRepository.Setup(c => c.AddUser(It.IsAny<User>())).ReturnsAsync(0);

            var result = await _manager.RegisterUser(It.IsAny<RegistrationModel>());

            Assert.True(result == ErrorDictionary.Error);
        }

        [Theory]
        [AutoMoqData]
        public async Task Login_No_User_Error(LoginModel model)
        {
            _userRepository.Setup(c => c.GetUserByEmail(It.IsAny<string>())).ReturnsAsync((User)null);

            var result = await _manager.Login(model);

            Assert.True(result == null);
        }

        [Theory]
        [AutoMoqData]
        public async Task Login_Wrong_Pass_Error(LoginModel model, User user)
        {
            _userRepository.Setup(c => c.GetUserByEmail(It.IsAny<string>())).ReturnsAsync(user);

            var result = await _manager.Login(model);

            Assert.True(result == null);
        }

        [Theory]
        [AutoMoqData]
        public async Task Login_Success(LoginModel model, User user)
        {
            user.PasswordHash = PasswordHashHelper.HashPassword(model.Password);
            _userRepository.Setup(c => c.GetUserByEmail(It.IsAny<string>())).ReturnsAsync(user);

            var result = await _manager.Login(model);

            Assert.True(result.Id == user.Id);
            Assert.True(result.Name == user.Name);
        }

        [Theory]
        [AutoMoqData]
        public async Task GetUserById_Success(User user)
        {
            var model = new UserModel() { Name = user.Name, Id = user.Id };
            _userRepository.Setup(c => c.GetUserById(It.IsAny<int>())).ReturnsAsync(user);

            var result = await _manager.GetUserById(user.Id);

            Assert.True(result.Id == user.Id);
            Assert.True(result.Name == user.Name);
        }

        [Theory]
        [AutoMoqData]
        public async Task GetUserByEmail_Success(User user)
        {
            var model = new UserModel() { Name = user.Name, Id = user.Id };
            _userRepository.Setup(c => c.GetUserByEmail(It.IsAny<string>())).ReturnsAsync(user);

            var result = await _manager.GetUserByEmail(user.Email);

            Assert.True(result.Id == user.Id);
            Assert.True(result.Name == user.Name);
        }

        [Theory]
        [AutoMoqData]
        public async Task GetUsersWithoutId_Success(User model1, User model2)
        {
            var list = new List<User>() { model1, model2 };
            _userRepository.Setup(c => c.GetUsersWithoutId(It.IsAny<int>())).ReturnsAsync(list);

            var result = await _manager.GetUsersWithoutId(It.IsAny<int>());

            Assert.True(result.Count == 2);
        }

        [Theory]
        [AutoMoqData]
        public async Task GetUserInfo_Success(User user, decimal balance)
        {
            _userRepository.Setup(c => c.GetUserById(It.IsAny<int>())).ReturnsAsync(user);
            _balanceRepository.Setup(c => c.GetBalance(It.IsAny<int>())).ReturnsAsync(balance);

            var result = await _manager.GetUserInfo(It.IsAny<int>());

            Assert.True(result.Balance == balance);
            Assert.True(result.Id == user.Id);
            Assert.True(result.Name == user.Name);
        }

        [Fact]
        public async Task GetUserInfo_Error()
        {
            _userRepository.Setup(c => c.GetUserById(It.IsAny<int>())).ReturnsAsync((User)null);
            _balanceRepository.Setup(c => c.GetBalance(It.IsAny<int>())).ReturnsAsync(It.IsAny<decimal>());

            var result = await _manager.GetUserInfo(It.IsAny<int>());

            Assert.True(result == null);
        }
    }
}
