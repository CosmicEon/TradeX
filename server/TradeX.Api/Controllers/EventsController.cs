using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TradeX.DataAccess.Entities;
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

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SingleEventModel>>> GetAll()
        {
            var result = await _eventsService.GetAllAsync();

            return Ok(result);
        }

        [Authorize]
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
                return StatusCode(400, result.Errors);
            }

            return Ok(result.Data);
        }
    }
}
