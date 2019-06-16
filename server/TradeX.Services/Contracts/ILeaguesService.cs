using System.Collections.Generic;
using System.Threading.Tasks;
using TradeX.Models.Leagues;

namespace TradeX.Services.Contracts
{
    public interface ILeaguesService
    {
        Task<IEnumerable<SingleLeagueModel>> GetAllAsync();
    }
}
