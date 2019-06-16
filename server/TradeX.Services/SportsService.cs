using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TradeX.DataAccess;
using TradeX.Models.Sports;
using TradeX.Services.Contracts;

namespace TradeX.Services
{
    public class SportsService : BaseService, ISportsService
    {
        public SportsService(TradeXContext db) : base(db)
        {
        }

        public async Task<IEnumerable<SingleSportModel>> GetAllAsync()
        {
            var result = await _db.Sports.Select(s => new SingleSportModel
            {
                Id = s.Id,
                Name = s.Name
            })
            .ToListAsync();

            return result;
        }
    }
}
