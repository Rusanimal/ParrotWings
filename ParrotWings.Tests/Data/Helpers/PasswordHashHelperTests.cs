using ParrotWings.Data.Helpers;
using System;
using Xunit;

namespace ParrotWings.Tests.Data.Helpers
{
    public class PasswordHashHelperTests
    {
        [Fact]
        public void HashPassword_Verify_True()
        {
            var text = Guid.NewGuid().ToString();
            var hashed = PasswordHashHelper.HashPassword(text);
            var hashed2 = PasswordHashHelper.HashPassword(text);
            Assert.True(hashed == hashed2);
        }

        [Fact]
        public void HashPassword_Verify_False()
        {
            var text = Guid.NewGuid().ToString();
            var text2 = Guid.NewGuid().ToString();
            var hashed = PasswordHashHelper.HashPassword(text);
            var hashed2 = PasswordHashHelper.HashPassword(text2);
            Assert.False(hashed == hashed2);
        }

    }
}
