using Microsoft.EntityFrameworkCore;

namespace CS.Data
{
    public class CsDbContext : DbContext
    {
        public CsDbContext()
        {
        }

        public CsDbContext(DbContextOptions<CsDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(typeof(CsDbContext).Assembly);
        }
    }
}
