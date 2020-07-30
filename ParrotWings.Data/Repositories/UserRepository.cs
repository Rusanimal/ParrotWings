using Microsoft.EntityFrameworkCore;
using ParrotWings.Data.Entities;
using ParrotWings.Data.Helpers;
using ParrotWings.Data.Repositories.DataContext;
using ParrotWings.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParrotWings.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IContextFactory _context;
        public UserRepository(IContextFactory context)
        {
            _context = context;
        }

        public async Task<int> AddUser(User user)
        {
            var context = _context.GetContext();
            user.PasswordHash = PasswordHashHelper.HashPassword(user.PasswordHash);
            user.CreationDate = DateTime.Now;
            context.Users.Add(user);

            await context.SaveChangesAsync();

            return user.Id;
        }

        public async Task<User> GetUserById(int userId)
        {
            return await _context.GetContext().Users.FirstOrDefaultAsync(c => c.Id == userId);
        }
        public async Task<User> GetUserByEmail(string email)
        {
            return await _context.GetContext().Users.FirstOrDefaultAsync(c => c.Email == email);
        }

        public async Task<List<User>> GetUsersWithoutId(int userId)
        {
            return await _context.GetContext().Users.Where(c => c.Id != userId).ToListAsync();
        }
    }
}
