using ParrotWings.Data.Models;
using System.Threading.Tasks;

namespace ParrotWings.Data.Managers.Interfaces
{
    public interface ITransactionManager
    {
        Task<string> CreateTransaction(int userId, CreateTransactionModel transactionModel);
        Task<CreateTransactionModel> GetTransitionCopy(int transitionId, int userId);
    }
}