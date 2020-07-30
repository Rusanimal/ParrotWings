namespace ParrotWings.Data.Repositories.DataContext
{
    public interface IContextFactory
    {
        ApplicationDbContext GetContext();
    }
}
