using System.Collections.Generic;
using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore;
using u24717739_HW01_API.Models;

namespace u24717739_HW01_API.Data
{
    public class AppDbContext : DbContext
    {
  
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Event> Events { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
          
        }
    }
}
