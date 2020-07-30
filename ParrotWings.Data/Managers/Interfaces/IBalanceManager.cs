using ParrotWings.Data.Models.ParrotWings.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ParrotWings.Data.Managers.Interfaces
{
    public interface IBalanceManager
    {
        Task<bool> CheckBalance(int userId, decimal amount);
        Task<decimal> GetBalance(int userId);
        Task<List<TransitionModel>> GetHistoryBalance(int userId);
    }
}