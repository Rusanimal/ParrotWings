using Microsoft.EntityFrameworkCore;
using ParrotWings.Data.Entities;
using ParrotWings.Data.Models;
using ParrotWings.Data.Repositories.DataContext;
using ParrotWings.Data.Repositories.Interfaces;
using System.Linq;
using System.Threading.Tasks;

namespace ParrotWings.Data.Repositories
{
    public class TransferTransactionRepository : ITransferTransactionRepository
    {
        private readonly IContextFactory _context;
        public TransferTransactionRepository(IContextFactory context)
        {
            _context = context;
        }

        public async Task<int> AddTransaction(TransferTransaction model)
        {
            var context = _context.GetContext();
            context.TransferTransactions.Add(model);

            await context.SaveChangesAsync();

            return model.Id;
        }

        public async Task RemoveTransaction(int id)
        {
            var context = _context.GetContext();
            var entity = await context.TransferTransactions.FirstOrDefaultAsync(c => c.Id == id);

            context.TransferTransactions.Remove(entity);

            await context.SaveChangesAsync();
        }

        public async Task<CreateTransactionModel> GetTransactionByIdAndUser(int id, int userId)
        {
            return await _context.GetContext().TransferTransactions.Include(c => c.Balance)
                .Include(c => c.Recipient).Where(c => c.Id == id).Select(c => new CreateTransactionModel()
                {
                    CorrespondentId = c.RecipientId,
                    CorrespondentName = c.Recipient.Name,
                    Amount = c.Balance.First(c => c.UserId != userId).Amount
                }).FirstOrDefaultAsync();
        }
    }
}
