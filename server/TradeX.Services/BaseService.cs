using TradeX.DataAccess;

namespace TradeX.Services
{
    public abstract class BaseService
    {
        protected readonly TradeXContext _db;

        public BaseService(TradeXContext db)
        {
            this._db = db;
        }
    }
}
