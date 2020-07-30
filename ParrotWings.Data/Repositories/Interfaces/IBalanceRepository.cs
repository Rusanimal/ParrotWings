using ParrotWings.Data.Entities;
using ParrotWings.Data.Models.ParrotWings.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ParrotWings.Data.Repositories.Interfaces
{
    public interface IBalanceRepository
    {
        Task<int> AddBalanceEntry(Balance balance);
        Task<List<Balance>> AddBalanceEntries(List<Balance> list);
        Task RemoveBalanceEntry(Balance entity);
        Task<decimal> GetBalance(int userId);
        Task<List<TransitionModel>> GetBalanceHistory(int userId);
    }
}