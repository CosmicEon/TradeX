using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TradeX.DataAccess;
using TradeX.Models.Leagues;
using TradeX.Services.Contracts;

namespace TradeX.Services
{
    public class LeaguesService : BaseService, ILeaguesService
    {
        public LeaguesService(TradeXContext db) : base(db)
        {
        }

        public async Task<IEnumerable<SingleLeagueModel>> GetAllAsync()
        {
            var result = await _db.Sports.Select(s => new SingleLeagueModel
            {
                Id = s.Id,
                Name = s.Name
            })
            .ToListAsync();

            return result;
        }
    }
}
