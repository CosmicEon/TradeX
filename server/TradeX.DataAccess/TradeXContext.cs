using Microsoft.EntityFrameworkCore;
using TradeX.DataAccess.Entities;

namespace TradeX.DataAccess
{
    public class TradeXContext : DbContext
    {
        public TradeXContext(DbContextOptions options)
           : base(options)
        {

        }

        public DbSet<User> Users { get; set; }

        public DbSet<Event> Events { get; set; }

        public DbSet<League> League { get; set; }

        public DbSet<Sport> Sports { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
               .HasIndex(u => u.Email)
               .IsUnique();
        }
    }
}
