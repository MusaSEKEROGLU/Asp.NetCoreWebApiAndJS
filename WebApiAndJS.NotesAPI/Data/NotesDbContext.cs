using Microsoft.EntityFrameworkCore;
using WebApiAndJS.NotesAPI.Models.Entities;

namespace WebApiAndJS.NotesAPI.Data
{
    public class NotesDbContext : DbContext
    {
        public NotesDbContext(DbContextOptions options) : base(options)
        {
            
        }
        public DbSet<Note> Notes { get; set; }
    }   
}
