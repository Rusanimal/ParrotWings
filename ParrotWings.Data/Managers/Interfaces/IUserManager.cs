using ParrotWings.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ParrotWings.Data.Managers.Interfaces
{
    public interface IUserManager
    {
        Task<UserModel> GetUserByEmail(string email);
        Task<UserModel> GetUserById(int id);
        Task<UserInfoModel> GetUserInfo(int userId);
        Task<List<UserModel>> GetUsersWithoutId(int id);
        Task<UserInfoModel> Login(LoginModel model);
        Task<string> RegisterUser(RegistrationModel model);
    }
}