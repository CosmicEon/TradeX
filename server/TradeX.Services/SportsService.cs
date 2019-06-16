using TradeX.DataAccess;
using TradeX.Services.Contracts;

namespace TradeX.Services
{
    public class SportsService : BaseService, ISportsService
    {
        public SportsService(TradeXContext db) : base(db)
        {

        }
    }
}
