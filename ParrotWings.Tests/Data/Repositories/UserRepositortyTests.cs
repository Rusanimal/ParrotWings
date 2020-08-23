using Moq;
using ParrotWings.Data.Entities;
using ParrotWings.Data.Repositories;
using ParrotWings.Data.Repositories.DataContext;
using ParrotWings.Tests.FakeFactories;
using SemanticComparison.Fluent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace ParrotWings.Tests.Data.Repositories
{
    public class UserRepositortyTests
    {
        private readonly UserRepository _repository;
        private readonly ApplicationDbContext context;

        public UserRepositortyTests()
        {
            context = FakeContextFactory.GetContext();
            context.ChangeTracker.LazyLoadingEnabled = false;
            var factory = new Mock<IContextFactory>(MockBehavior.Strict);
            factory.Setup(f => f.GetContext()).Returns(context);
            _repository = new UserRepository(factory.Object);
        }

        [Theory]
        [AutoMoqData]
        public async Task GetUserById_Success(User user)
        {

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var result = (await _repository.GetUserById(user.Id)).AsSource().OfLikeness<User>();

            Assert.True(result.Equals(user));
        }

        [Theory]
        [AutoMoqData]
        public async Task GetUserById_Null_Success(User user)
        {
            var result = (await _repository.GetUserById(user.Id));

            Assert.True(result == null);
        }

        [Theory]
        [AutoMoqData]
        public async Task AddUser_Success(User user)
        {
            var result = await _repository.AddUser(user);
            var recivied = context.Users.First(c => c.Id == user.Id).AsSource().OfLikeness<User>();

            Assert.True(recivied.Equals(user));
        }

        [Theory]
        [AutoMoqData]
        public async Task GetUserByEmail_Null_Success(User user)
        {
            var result = (await _repository.GetUserByEmail(user.Email));

            Assert.True(result == null);
        }

        [Theory]
        [AutoMoqData]
        public async Task GetUserByEmail_Success(User user)
        {

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var result = (await _repository.GetUserByEmail(user.Email)).AsSource().OfLikeness<User>();

            Assert.True(result.Equals(user));
        }

        [Theory]
        [AutoMoqData]
        public async Task GetUsersWithoutId_Success(User user1, User user2, User user3)
        {
            var data = new List<User> { user1, user2, user3 };

            context.Users.AddRange(data);
            await context.SaveChangesAsync();

            var result = await _repository.GetUsersWithoutId(user1.Id);

            Assert.True(result.Count == 2);
            Assert.True(result.Contains(user1) == false);
        }

        [Theory]
        [AutoMoqData]
        public async Task GetUsersWithoutId_Empty_Success(int userId)
        {
            var result = await _repository.GetUsersWithoutId(userId);

            Assert.True(result.Count == 0);
        }
    }
}
