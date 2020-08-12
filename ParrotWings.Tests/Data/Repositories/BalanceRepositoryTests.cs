using AutoFixture.Xunit2;
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
    public class BalanceRepositoryTests
    {
        private readonly BalanceRepository _repository;
        private readonly ApplicationDbContext context;

        public BalanceRepositoryTests()
        {
            context = FakeContextFactory.GetContext();
            context.ChangeTracker.LazyLoadingEnabled = false;
            var factory = new Mock<IContextFactory>(MockBehavior.Strict);
            factory.Setup(f => f.GetContext()).Returns(context);
            _repository = new BalanceRepository(factory.Object);

        }

        [Fact]
        public async Task GetBalance_Success()
        {
            var data = new List<Balance>
            {
                new Balance { Amount = 1, UserId = 1 },
                new Balance { Amount = 0, UserId = 1 },
                new Balance { Amount = 29, UserId = 1 }
            };

            context.Balances.AddRange(data);
            await context.SaveChangesAsync();

            var result = await _repository.GetBalance(1);

            Assert.True(result == 30);
        }

        [Fact]
        public async Task GetBalance_Zero_Success()
        {
            var result = await _repository.GetBalance(It.IsAny<int>());

            Assert.True(result == 0);
        }

        [Theory]
        [AutoMoqData]
        public async Task AddBalanceEntry_Success(Balance model)
        {
            var result = await _repository.AddBalanceEntry(model);

            var recivied = context.Balances.FirstOrDefault(c => c.Id == model.Id).AsSource().OfLikeness<Balance>();
            Assert.True(recivied.Equals(model));
        }

        [Theory]
        [AutoMoqData]
        public async Task AddBalanceEntries_Success(Balance model1, Balance model2)
        {
            var list = new List<Balance>() { model1, model2 };
            var result = await _repository.AddBalanceEntries(list);

            var recivied1 = context.Balances.First(c => c.Id == model1.Id).AsSource().OfLikeness<Balance>();
            var recivied2 = context.Balances.First(c => c.Id == model2.Id).AsSource().OfLikeness<Balance>();
            Assert.True(recivied1.Equals(model1));
            Assert.True(recivied2.Equals(model2));
        }

        [Theory]
        [AutoMoqData]
        public async Task RemoveBalanceEntry_Success(Balance model)
        {
            context.Add(model);

            await context.SaveChangesAsync();

            await _repository.RemoveBalanceEntry(model);

            Assert.True(context.Balances.Count() == 0);
        }

        [Theory]
        [AutoMoqData]
        public async Task GetBalanceHistory_CountIsZero_Success(int userId)
        {
            var result = await _repository.GetBalanceHistory(userId);

            Assert.True(result.Count() == 0);
        }

        [Theory]
        [AutoMoqData]
        public async Task GetBalanceHistory_Success(Balance model)
        {
            context.Balances.Add(model);
            await context.SaveChangesAsync();

            var result = await _repository.GetBalanceHistory(model.UserId);

            Assert.True(result.Count() == 1);
            Assert.Equal(result.First().Amount, model.Amount);
            Assert.Equal(result.First().BalanceId, model.Id);
            Assert.Equal(result.First().CorrespondentName, model.TransferTransaction.Recipient.Name);
            Assert.Equal(result.First().CreationDate, model.CreationDate);
            Assert.Equal(result.First().TransitionId, model.TransferTransactionId);
        }
    }
}
