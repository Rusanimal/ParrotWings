using Moq;
using ParrotWings.Data.Managers;
using ParrotWings.Data.Models.ParrotWings.Data.Models;
using ParrotWings.Data.Repositories.Interfaces;
using ParrotWings.Tests.FakeFactories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace ParrotWings.Tests.Managers
{
    public class BalanceManagerTests
    {
        private readonly BalanceManager _manager;
        private readonly Mock<IBalanceRepository> _balanceRepository;
        public BalanceManagerTests()
        {
            _balanceRepository = new Mock<IBalanceRepository>(MockBehavior.Strict);
            _manager = new BalanceManager(_balanceRepository.Object);
        }

        [Theory]
        [AutoMoqData]
        public async Task GetBalance_Success(decimal balance, int userId)
        {
            _balanceRepository.Setup(c => c.GetBalance(userId)).ReturnsAsync(balance);

            var result = await _manager.GetBalance(userId);

            Assert.True(result == balance);
        }

        [Theory]
        [AutoMoqData]
        public async Task GetHistoryBalance_Success(TransitionModel model1, TransitionModel model2, int userId)
        {
            var list = new List<TransitionModel>() { model1, model2 };
            _balanceRepository.Setup(c => c.GetBalanceHistory(userId)).ReturnsAsync(list);

            var result = await _manager.GetHistoryBalance(userId);

            var first = result.First();
            var last = result.Last();

            Assert.True(result.Count == 2);
            Assert.True(last.ResultingBalance == list.First(c => last.TransitionId == c.TransitionId).Amount);
            Assert.True(first.ResultingBalance == list.Sum(c => c.Amount));
            Assert.True(result.First().CreationDate > last.CreationDate);
        }

        [Theory]
        [AutoMoqData]
        public async Task CheckBalance_True_Success(decimal balance, int userId)
        {
            var amount = balance;

            _balanceRepository.Setup(c => c.GetBalance(userId)).ReturnsAsync(balance);

            var result = await _manager.CheckBalance(userId, amount);

            Assert.True(result == true);
        }

        [Theory]
        [AutoMoqData]
        public async Task CheckBalance_False_Success(decimal balance, int userId)
        {
            var amount = balance + 1;

            _balanceRepository.Setup(c => c.GetBalance(userId)).ReturnsAsync(balance);

            var result = await _manager.CheckBalance(userId, amount);

            Assert.True(result == false);
        }
    }
}
