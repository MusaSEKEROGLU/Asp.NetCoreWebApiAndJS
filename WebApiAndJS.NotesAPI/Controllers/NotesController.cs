using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApiAndJS.NotesAPI.Data;
using WebApiAndJS.NotesAPI.Models.Entities;

namespace WebApiAndJS.NotesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly NotesDbContext _context;

        public NotesController(NotesDbContext context)
        {
            _context = context;
        }



        [HttpGet]
        public async Task<IActionResult> GetAllNotes()
        {
            return Ok(await _context.Notes.ToListAsync());
        }

        [HttpGet]
        [Route("{id:Guid}")]
        [ActionName("GetById")]
        public async Task<IActionResult> GetById([FromRoute]Guid id)
        {
            var note = await _context.Notes.FindAsync(id);
            if (note == null)
            {
                return NotFound();
            }
            return Ok(note);
        }

        [HttpPost]
        public async Task<IActionResult> AddNote(Note note)
        {
            note.Id = Guid.NewGuid();
            await _context.Notes.AddAsync(note);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new {id = note.Id},note);
        }


        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateNote([FromRoute] Guid id, [FromBody] Note updateNote)
        {
            var existNote = await _context.Notes.FindAsync(id);
            if (existNote == null)
            {
                return NotFound();
            }
            existNote.Title = updateNote.Title;
            existNote.Description = updateNote.Description;
            existNote.IsVisible = updateNote.IsVisible;

            await _context.SaveChangesAsync();
            return Ok(existNote);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteNote([FromRoute] Guid id)
        {
            var existNote = await _context.Notes.FindAsync(id);
            if(existNote == null)
            {
                return NotFound();
            }
             _context.Notes.Remove(existNote);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
