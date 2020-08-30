using Moq;
using ParrotWings.Data;
using ParrotWings.Data.Entities;
using ParrotWings.Data.Managers;
using ParrotWings.Data.Models;
using ParrotWings.Data.Repositories.Interfaces;
using ParrotWings.Tests.FakeFactories;
using SemanticComparison.Fluent;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace ParrotWings.Tests.Managers
{
    public class TransactionManagerTests
    {
        private readonly TransactionManager _manager;
        private readonly Mock<IBalanceRepository> _balanceRepository;
        private readonly Mock<ITransferTransactionRepository> _transactionRepository;
        public TransactionManagerTests()
        {
            _balanceRepository = new Mock<IBalanceRepository>(MockBehavior.Strict);
            _transactionRepository = new Mock<ITransferTransactionRepository>(MockBehavior.Strict);
            _manager = new TransactionManager(_balanceRepository.Object, _transactionRepository.Object);
        }

        [Theory]
        [AutoMoqData]
        public async Task GetTransitionCopy_Success(CreateTransactionModel model)
        {
            _transactionRepository.Setup(c => c.GetTransactionByIdAndUser(It.IsAny<int>(), It.IsAny<int>())).ReturnsAsync(model);

            var result = (await _manager.GetTransitionCopy(It.IsAny<int>(), It.IsAny<int>())).AsSource().OfLikeness<CreateTransactionModel>();

            Assert.True(result.Equals(model));
        }

        [Theory]
        [AutoMoqData]
        public async Task CreateTransaction_Success(CreateTransactionModel model, Balance balance1, Balance balance2)
        {
            var list = new List<Balance>() { balance1, balance2 };
            _balanceRepository.Setup(c => c.GetBalance(0)).ReturnsAsync((decimal)(model.Amount +1)).Verifiable();
            _transactionRepository.Setup(c => c.AddTransaction(It.IsAny<TransferTransaction>())).ReturnsAsync(1).Verifiable();
            _balanceRepository.Setup(c => c.AddBalanceEntries(It.IsAny<List<Balance>>())).ReturnsAsync(list).Verifiable();

            var result = await _manager.CreateTransaction(0, model);

            _balanceRepository.Verify(c => c.GetBalance(0), Times.Once);
            _transactionRepository.Verify(c => c.AddTransaction(It.IsAny<TransferTransaction>()), Times.Once);
            _balanceRepository.Verify(c => c.AddBalanceEntries(It.IsAny<List<Balance>>()), Times.Once);
            Assert.True(result == ErrorDictionary.Ok);
        }

        [Theory]
        [AutoMoqData]
        public async Task CreateTransaction_Smaller_Balance_Error(CreateTransactionModel model)
        {
            _balanceRepository.Setup(c => c.GetBalance(0)).ReturnsAsync((decimal)(model.Amount - 1)).Verifiable();
            _transactionRepository.Setup(c => c.AddTransaction(It.IsAny<TransferTransaction>())).ReturnsAsync(1).Verifiable();
            _balanceRepository.Setup(c => c.AddBalanceEntries(It.IsAny<List<Balance>>())).ReturnsAsync(It.IsAny<List<Balance>>).Verifiable();

            var result = await _manager.CreateTransaction(0, model);

            _balanceRepository.Verify(c => c.GetBalance(0), Times.Once);
            _transactionRepository.Verify(c => c.AddTransaction(It.IsAny<TransferTransaction>()), Times.Never);
            _balanceRepository.Verify(c => c.AddBalanceEntries(It.IsAny<List<Balance>>()), Times.Never);
            Assert.True(result == ErrorDictionary.BalanceSmallerThenAmount);
        }

        [Theory]
        [AutoMoqData]
        public async Task CreateTransaction_Error(CreateTransactionModel model, Balance balance1, Balance balance2)
        {
            balance1.Id = 0;
            var list = new List<Balance>() { balance1, balance2 };
            _balanceRepository.Setup(c => c.GetBalance(0)).ReturnsAsync((decimal)(model.Amount + 1)).Verifiable();
            _transactionRepository.Setup(c => c.AddTransaction(It.IsAny<TransferTransaction>())).ReturnsAsync(1).Verifiable();
            _balanceRepository.Setup(c => c.AddBalanceEntries(It.IsAny<List<Balance>>())).ReturnsAsync(list).Verifiable();
            _balanceRepository.Setup(c => c.RemoveBalanceEntry(It.IsAny<Balance>())).Returns(Task.CompletedTask).Verifiable();
            _transactionRepository.Setup(c => c.RemoveTransaction(1)).Returns(Task.CompletedTask).Verifiable();

            var result = await _manager.CreateTransaction(0, model);

            _balanceRepository.Verify(c => c.GetBalance(0), Times.Once);
            _transactionRepository.Verify(c => c.AddTransaction(It.IsAny<TransferTransaction>()), Times.Once);
            _balanceRepository.Verify(c => c.AddBalanceEntries(It.IsAny<List<Balance>>()), Times.Once);
            _balanceRepository.Verify(c => c.RemoveBalanceEntry(It.IsAny<Balance>()), Times.Once);
            _transactionRepository.Verify(c => c.RemoveTransaction(1), Times.Once);

            Assert.True(result == ErrorDictionary.Error);
        }
    }
}
