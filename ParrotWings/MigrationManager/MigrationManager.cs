using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ParrotWings.Data.Repositories.DataContext;

namespace ParrotWings.MigrationManager
{
    public static class MigrationManager
    {
        public static IHost MigrateDatabase(this IHost host)
        {
            using (var scope = host.Services.CreateScope())
            {
                using var appDbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                appDbContext.Database.Migrate();
            }

            return host;
        }
    }
}
