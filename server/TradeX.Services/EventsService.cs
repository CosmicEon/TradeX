using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TradeX.Constants.ErrorMessages;
using TradeX.DataAccess;
using TradeX.DataAccess.Entities;
using TradeX.Models.Events;
using TradeX.Services.Contracts;
using TradeX.Services.Results;

namespace TradeX.Services
{
    public class EventsService : BaseService, IEventsService
    {
        public EventsService(TradeXContext db) : base(db)
        {

        }

        private IQueryable<Event> Events => _db.Events;

        public async Task<IEnumerable<SingleEventModel>> GetAllAsync()
        {
            var query = Events;

            var result = await query
                .Select(e => new SingleEventModel
                {
                    Name = e.Name,
                })
                .ToListAsync();

            return result;
        }

        public async Task<ServiceResult<SingleEventModel>> GetByIdAsync(int id)
        {
            var @event = await Events.FirstOrDefaultAsync(e => e.Id == id);

            if (@event == null)
            {
                return ServiceResult<SingleEventModel>.Failed(NotFound.StatusCode, new ResultError(NotFound.NoSuchEvent));
            }

            var result = new SingleEventModel
            {
                Name = @event.Name,
            };

            return ServiceResult<SingleEventModel>.Success(result);
        }

        public async Task<ServiceResult<Event>> CreateAsync(CreateEventReqModel model)
        {
            var @event = model.ToEntity();

            await _db.Events.AddAsync(@event);
            await _db.SaveChangesAsync();

            return ServiceResult<Event>.Success(@event);
        }
    }
}
