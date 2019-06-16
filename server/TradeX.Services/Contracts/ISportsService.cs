using System.Collections.Generic;
using System.Threading.Tasks;
using TradeX.Models.Sports;

namespace TradeX.Services.Contracts
{
    public interface ISportsService
    {
        Task<IEnumerable<SingleSportModel>> GetAllAsync();
    }
}
