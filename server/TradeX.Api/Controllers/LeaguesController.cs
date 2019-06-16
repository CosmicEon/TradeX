using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TradeX.Models.Leagues;
using TradeX.Services.Contracts;

namespace TradeX.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaguesController : ControllerBase
    {
        private readonly ILeaguesService _leaguesService;

        public LeaguesController(ILeaguesService leaguesService)
        {
            _leaguesService = leaguesService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SingleLeagueModel>>> GetAll()
        {
            var result = await _leaguesService.GetAllAsync();

            return Ok(result);
        }
    }
}
