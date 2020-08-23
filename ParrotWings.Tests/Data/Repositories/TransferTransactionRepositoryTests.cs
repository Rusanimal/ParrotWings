using Moq;
using ParrotWings.Data.Entities;
using ParrotWings.Data.Repositories;
using ParrotWings.Data.Repositories.DataContext;
using ParrotWings.Tests.FakeFactories;
using SemanticComparison.Fluent;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace ParrotWings.Tests.Data.Repositories
{
    public class TransferTransactionRepositoryTests
    {
        private readonly TransferTransactionRepository _repository;
        private readonly ApplicationDbContext context;

        public TransferTransactionRepositoryTests()
        {
            context = FakeContextFactory.GetContext();
            context.ChangeTracker.LazyLoadingEnabled = false;
            var factory = new Mock<IContextFactory>(MockBehavior.Strict);
            factory.Setup(f => f.GetContext()).Returns(context);
            _repository = new TransferTransactionRepository(factory.Object);
        }

        [Theory]
        [AutoMoqData]
        public async Task AddTransaction_Success(TransferTransaction model)
        {
            var result = await _repository.AddTransaction(model);
            var recivied = context.TransferTransactions.First(c => c.Id == model.Id).AsSource().OfLikeness<TransferTransaction>();

            Assert.True(recivied.Equals(model));
        }

        [Theory]
        [AutoMoqData]
        public async Task RemoveTransaction_Success(TransferTransaction model)
        {
            context.TransferTransactions.Add(model);
            await context.SaveChangesAsync();

           await _repository.RemoveTransaction(model.Id);

            var recivied = context.TransferTransactions.FirstOrDefault(c => c.Id == model.Id);

            Assert.True(recivied == null);
        }

        [Theory]
        [AutoMoqData]
        public async Task GetTransactionByIdAndUser_Success(Balance model)
        {

            context.Balances.Add(model);
            await context.SaveChangesAsync();

            var result = await _repository.GetTransactionByIdAndUser(model.TransferTransaction.Id, (int)model.TransferTransaction.SenderId);

            Assert.True(result.CorrespondentId == model.TransferTransaction.RecipientId);
            Assert.True(result.CorrespondentName == model.TransferTransaction.Recipient.Name);
            Assert.True(result.Amount == model.Amount);
        }
    }
}
