using Moq;
using ParrotWings.Extensions;
using ParrotWings.Tests.FakeFactories;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Principal;
using Xunit;

namespace ParrotWings.Tests.Extensions
{
    public class IdentityExtensionsTests
    {
        private readonly Mock<IPrincipal> _mockPrincipal;

        public IdentityExtensionsTests()
        {
            _mockPrincipal = new Mock<IPrincipal>();
        }

        [Theory]
        [AutoMoqData]
        public void GetUserId_Success(int id)
        {
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.NameIdentifier, id.ToString()));

            _mockPrincipal.Setup(c => c.Identity).Returns(new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType));
            var principal = _mockPrincipal.Object;

            var result = principal.Identity.GetUserId();

            Assert.True(result == id);
        }

        [Fact]
        public void GetUserId_Exception()
        {
            var principal = _mockPrincipal.Object;
            try
            {
                var result = principal.Identity.GetUserId();
            }
            catch (Exception ex)
            {
                Assert.True(ex is ArgumentNullException);
                Assert.True(ex.Message.Equals("Value cannot be null. (Parameter 'identity')"));
            }
        }

        [Fact]
        public void GetUserId_Zero_Id()
        {
            var claims = new List<Claim>();

            _mockPrincipal.Setup(c => c.Identity).Returns(new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType));
            var principal = _mockPrincipal.Object;

            var result = principal.Identity.GetUserId();

            Assert.True(result == 0);
        }
    }
}
