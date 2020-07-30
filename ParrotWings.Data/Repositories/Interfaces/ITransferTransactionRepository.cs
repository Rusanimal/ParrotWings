using ParrotWings.Data.Entities;
using ParrotWings.Data.Models;
using System.Threading.Tasks;

namespace ParrotWings.Data.Repositories.Interfaces
{
    public interface ITransferTransactionRepository
    {
        Task<int> AddTransaction(TransferTransaction model);
        Task<CreateTransactionModel> GetTransactionByIdAndUser(int id, int userId);
        Task RemoveTransaction(int id);
    }
}