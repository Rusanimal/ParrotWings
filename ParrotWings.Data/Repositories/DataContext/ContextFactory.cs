using Microsoft.EntityFrameworkCore;

namespace ParrotWings.Data.Repositories.DataContext
{
    public class ContextFactory : IContextFactory
    {
        private readonly DbContextOptions<ApplicationDbContext> options;

        public ContextFactory(DbContextOptions<ApplicationDbContext> options)
        {
            this.options = options;
        }

        public ApplicationDbContext GetContext()
        {
            return new ApplicationDbContext(options);
        }
    }
}
