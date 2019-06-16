using System.Collections.Generic;
using System.Threading.Tasks;
using TradeX.DataAccess.Entities;
using TradeX.Models.Events;
using TradeX.Services.Results;

namespace TradeX.Services.Contracts
{
    public interface IEventsService
    {
        Task<IEnumerable<SingleEventModel>> GetAllAsync();

        Task<ServiceResult<SingleEventModel>> GetByIdAsync(int id);

        Task<ServiceResult<Event>> CreateAsync(CreateEventReqModel model);
    }
}
