using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TradeX.DataAccess.Entities;
using TradeX.Models;
using TradeX.Models.Events;
using TradeX.Services.Contracts;

namespace TradeX.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IEventsService _eventsService;

        public EventsController(IEventsService eventsService)
        {
            _eventsService = eventsService;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<SingleEventModel>>> GetAll(int? sportId, int? leagueId, string searchTerm, int pageIndex = 1)
        {
            var result = await _eventsService.GetAllAsync(sportId, leagueId, searchTerm, pageIndex);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SingleEventModel>> GetById(int id)
        {
            var result = await _eventsService.GetByIdAsync(id);

            if(!result.Succeeded)
            {
                return StatusCode(result.StatusCode, result.Errors);
            }

            return result.Data;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Event>> Post(CreateEventReqModel model)
        {
            var result = await _eventsService.CreateAsync(model);

            if(!result.Succeeded)
            {
                return StatusCode(result.StatusCode, result.Errors);
            }

            return Ok(result.Data);
        }

        [Authorize]
        [HttpPatch("{id}")]
        public async Task<ActionResult> Update(int id, UpdateEventReqModel model)
        {
            var result = await _eventsService.UpdateAsync(id, model);

            if (!result.Succeeded)
            {
                return StatusCode(result.StatusCode, result.Errors);
            }

            return NoContent();
        }
    }
}
