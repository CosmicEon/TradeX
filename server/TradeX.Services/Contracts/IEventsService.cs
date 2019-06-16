using System.Threading.Tasks;
using TradeX.DataAccess.Entities;
using TradeX.Models;
using TradeX.Models.Events;
using TradeX.Services.Results;

namespace TradeX.Services.Contracts
{
    public interface IEventsService
    {
        Task<Pagination<SingleEventModel>> GetAllAsync(int? sportId, int? leagueId, string searchTerm, int pageIndex = 1);

        Task<ServiceResult<SingleEventModel>> GetByIdAsync(int id);

        Task<ServiceResult<Event>> CreateAsync(CreateEventReqModel model);

        Task<ServiceResult> UpdateAsync(int id, UpdateEventReqModel model);
    }
}
