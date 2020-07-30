using ParrotWings.Data.Managers.Interfaces;
using ParrotWings.Data.Models.ParrotWings.Data.Models;
using ParrotWings.Data.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParrotWings.Data.Managers
{
    public class BalanceManager : IBalanceManager
    {
        
        private readonly IBalanceRepository _balanceRepository;
        public BalanceManager(IBalanceRepository balanceRepository)
        {
            _balanceRepository = balanceRepository;
        }

        public async Task<decimal> GetBalance(int userId)
        {
            return await _balanceRepository.GetBalance(userId);
        }

        public async Task<List<TransitionModel>> GetHistoryBalance(int userId)
        {
            decimal sum = 0;
            var list = await _balanceRepository.GetBalanceHistory(userId);
            foreach(var item in list.OrderBy(c => c.CreationDate))
            {
                sum += item.Amount;
                item.ResultingBalance = sum;
            }

            return list.OrderByDescending(c => c.CreationDate).ToList();
        }

        public async Task<bool> CheckBalance(int userId, decimal amount)
        {
            var balance = await _balanceRepository.GetBalance(userId);
            return balance >= amount && amount > 0;
        }
    }
}