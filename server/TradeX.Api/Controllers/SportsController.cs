using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TradeX.Models.Sports;
using TradeX.Services.Contracts;

namespace TradeX.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SportsController : ControllerBase
    {
        private readonly ISportsService _sportsService;

        public SportsController(ISportsService sportsService)
        {
            _sportsService = sportsService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SingleSportModel>>> GetAll()
        {
            var result = await _sportsService.GetAllAsync();

            return Ok(result);
        }
    }
}
