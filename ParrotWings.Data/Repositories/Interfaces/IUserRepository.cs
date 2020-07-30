using ParrotWings.Data.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ParrotWings.Data.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<int> AddUser(User user);
        Task<User> GetUserByEmail(string email);
        Task<User> GetUserById(int userId);
        Task<List<User>> GetUsersWithoutId(int userId);
    }
}