using System;
using System.Security.Cryptography;
using System.Text;

namespace ParrotWings.Data.Helpers
{
    public static class PasswordHashHelper
    {
        public static string HashPassword(string password)
        {
            using (HashAlgorithm algorithm = new SHA256CryptoServiceProvider())
            {
                var passwordBytes = Encoding.UTF8.GetBytes(password);
                var passwordHashBytes = algorithm.ComputeHash(passwordBytes);

                return Convert.ToBase64String(passwordHashBytes);
            }
        }
    }
}
