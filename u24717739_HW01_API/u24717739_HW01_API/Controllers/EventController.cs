using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using u24717739_HW01_API.Data;
using u24717739_HW01_API.Models;

namespace u24717739_HW01_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EventController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Event  
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
        {
            var events = await _context.Events.ToListAsync();
            return Ok(events);                 
        }

        // GET: api/Event/5   
        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEvent(int id)
        {
            var @event = await _context.Events.FindAsync(id);

            if (@event == null)
                return NotFound();

            return Ok(@event);
        }

        // POST: api/Event   Add new event
        [HttpPost]
        public async Task<ActionResult<Event>> PostEvent(Event eventItem)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Events.Add(eventItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEvent), new { id = eventItem.Id }, eventItem);
        }

        // PUT: api/Event/5   Update event
        [HttpPut("{id}")]
        public async Task<ActionResult<Event>> PutEvent(int id, Event eventItem)
        {
            if (id != eventItem.Id)
                return BadRequest("ID mismatch");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Entry(eventItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventExists(id))
                    return NotFound();
                else
                    throw;
            }

            return Ok(eventItem);        // Return updated event
        }

        // DELETE: api/Event/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var eventItem = await _context.Events.FindAsync(id);

            if (eventItem == null)
                return NotFound();

            _context.Events.Remove(eventItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EventExists(int id)
        {
            return _context.Events.Any(e => e.Id == id);
        }
    }
}