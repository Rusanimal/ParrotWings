using AutoMapper;
using ParrotWings.Data.Entities;
using ParrotWings.Data.Helpers;
using ParrotWings.Data.Managers.Interfaces;
using ParrotWings.Data.Models;
using ParrotWings.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParrotWings.Data.Managers
{
    public class UserManager : IUserManager
    {
        private readonly IMapper _mapper;
        private readonly IBalanceRepository _balanceRepository;
        private readonly IUserRepository _userRepository;

        public UserManager(IMapper mapper, IBalanceRepository balanceRepository,
            IUserRepository userRepository)
        {
            _mapper = mapper;
            _balanceRepository = balanceRepository;
            _userRepository = userRepository;
        }

        public async Task<string> RegisterUser(RegistrationModel model)
        {
            var userId = await _userRepository.AddUser(_mapper.Map<User>(model));
            if (userId > 0)
            {
                await AddStartingBalance(userId);
                return ErrorDictionary.Ok;
            }
            else
            {
                return ErrorDictionary.Error;
            }
        }

        public async Task<UserInfoModel> Login(LoginModel model)
        {
            var user = await _userRepository.GetUserByEmail(model.Email);
            if (user != null && user.PasswordHash == PasswordHashHelper.HashPassword(model.Password))
            {
                var result = new UserInfoModel()
                {
                    Name = user.Name,
                    Id = user.Id
                };
                return result;
            }
            else
            {
                return null;
            }
        }

        public async Task<UserModel> GetUserById(int id)
        {
            return _mapper.Map<UserModel>(await _userRepository.GetUserById(id));
        }

        public async Task<UserModel> GetUserByEmail(string email)
        {
            return _mapper.Map<UserModel>(await _userRepository.GetUserByEmail(email));
        }

        public async Task<List<UserModel>> GetUsersWithoutId(int id)
        {
            var list = await _userRepository.GetUsersWithoutId(id);
            return list.Select(c => _mapper.Map<UserModel>(c)).ToList();
        }

        public async Task<UserInfoModel> GetUserInfo(int userId)
        {
            var user = await _userRepository.GetUserById(userId);
            var balance = await _balanceRepository.GetBalance(userId);
            if (user != null)
            {
                var result = new UserInfoModel()
                {
                    Id = user.Id,
                    Name = user.Name,
                    Balance = balance
                };
                return result;
            }
            return null;
        }

        private async Task AddStartingBalance(int userId)
        {
            var model = new Balance()
            {
                Amount = 500,
                CreationDate = DateTime.UtcNow,
                UserId = userId
            };
            await _balanceRepository.AddBalanceEntry(model);
        }
    }
}