using Microsoft.EntityFrameworkCore;
using ParrotWings.Data.Entities;

namespace ParrotWings.Data.Repositories.DataContext
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Balance> Balances { get; set; }
        public DbSet<TransferTransaction> TransferTransactions { get; set; }
        public DbSet<User> Users { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        { }
    }
}
