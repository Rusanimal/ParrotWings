using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.DependencyInjection;
using ParrotWings.Data.Repositories.DataContext;

namespace ParrotWings.Tests.Data
{
    public static class FakeContextFactory
    {
        private static DbContextOptions<ApplicationDbContext> CreateNewContextOptions()
        {
            var serviceProvider = new ServiceCollection()
                .AddEntityFrameworkInMemoryDatabase().BuildServiceProvider();
            var builder = new DbContextOptionsBuilder<ApplicationDbContext>();
            builder.UseInMemoryDatabase("db", new InMemoryDatabaseRoot())
                .UseInternalServiceProvider(serviceProvider);
            return builder.Options;
        }

        public static ApplicationDbContext GetContext()
        {
            return new ApplicationDbContext(CreateNewContextOptions());
        }

    }
}
