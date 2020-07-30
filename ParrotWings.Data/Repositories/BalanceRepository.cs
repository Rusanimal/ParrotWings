using Microsoft.EntityFrameworkCore;
using ParrotWings.Data.Entities;
using ParrotWings.Data.Models.ParrotWings.Data.Models;
using ParrotWings.Data.Repositories.DataContext;
using ParrotWings.Data.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParrotWings.Data.Repositories
{
    public class BalanceRepository : IBalanceRepository
    {
        private readonly IContextFactory _context;
        public BalanceRepository(IContextFactory context)
        {
            _context = context;
        }

        public async Task<int> AddBalanceEntry(Balance balance)
        {
            var context = _context.GetContext();
            context.Balances.Add(balance);

            await context.SaveChangesAsync();
            return balance.Id;
        }

        public async Task<List<Balance>> AddBalanceEntries(List<Balance> list)
        {
            var context = _context.GetContext();
            context.Balances.AddRange(list);

            await context.SaveChangesAsync();
            return list;
        }

        public async Task RemoveBalanceEntry(Balance entity)
        {
            var context = _context.GetContext();

            context.Balances.Remove(entity);

            await context.SaveChangesAsync();
        }

        public async Task<decimal> GetBalance(int userId)
        {
            return await _context.GetContext().Balances.Where(c => c.UserId == userId).SumAsync(c => c.Amount);
        }

        public async Task<List<TransitionModel>> GetBalanceHistory(int userId)
        {
            var context = _context.GetContext();
            return await context.Balances.Where(c => c.UserId == userId)
                .Include(c => c.TransferTransaction).ThenInclude(c => c.Recipient)
                .Include(c => c.TransferTransaction).ThenInclude(c => c.Sender)
                .Select(c =>  new TransitionModel()
                {
                    Amount = c.Amount,
                    BalanceId = c.Id,
                    CreationDate = c.CreationDate,
                    CorrespondentName = c.TransferTransaction.RecipientId != userId
                    ? c.TransferTransaction.Recipient.Name : c.TransferTransaction.Sender.Name,
                    TransitionId = (int)c.TransferTransactionId
                }).ToListAsync();
        }
    }

}
