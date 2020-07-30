using System;
using System.Globalization;
using System.Security.Claims;
using System.Security.Principal;

namespace ParrotWings.Extensions
{
    public static class IdentityExtensions
    {
        public static int GetUserId(this IIdentity identity)
        {
            if (identity == null)
            {
                throw new ArgumentNullException("identity");
            }

            var ci = identity as ClaimsIdentity;
            if (ci != null)
            {
                var id = ci.FindFirst(ClaimTypes.NameIdentifier);
                if (id != null)
                {
                    return (int)Convert.ChangeType(id.Value, typeof(int), CultureInfo.InvariantCulture);
                }
            }

            return default;
        }
    }
}
