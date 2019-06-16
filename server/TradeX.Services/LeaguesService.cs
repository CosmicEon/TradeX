using TradeX.DataAccess;
using TradeX.Services.Contracts;

namespace TradeX.Services
{
    public class LeaguesService : BaseService, ILeaguesService
    {
        public LeaguesService(TradeXContext db) : base(db)
        {

        }
    }
}
