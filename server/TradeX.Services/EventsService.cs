using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using TradeX.Constants;
using TradeX.Constants.ErrorMessages;
using TradeX.DataAccess;
using TradeX.DataAccess.Entities;
using TradeX.Models;
using TradeX.Models.Events;
using TradeX.Models.Leagues;
using TradeX.Models.Sports;
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

        public async Task<Pagination<SingleEventModel>> GetAllAsync(int? sportId, int? leagueId, string searchTerm, int pageIndex)
        {
            var query = Events;

            if (sportId.HasValue)
            {
                query = query.Where(e => e.League.SportId == sportId.Value);
            }

            if (leagueId.HasValue)
            {
                query = query.Where(e => e.LeagueId == leagueId.Value);
            }

            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(e => EF.Functions.Like(e.Name, $"%{searchTerm}%"));
            }

            var totalPages = (int)Math.Ceiling(await query.CountAsync() / (double)Pagination.DefaultPageSize);

            query = CreatePaginatedResult(query, pageIndex, Pagination.DefaultPageSize);

            var result = await query
                .Select(e => new SingleEventModel
                {
                    Id = e.Id,
                    Name = e.Name,
                    Date = e.Date,
                    HomeTeamScore = e.HomeTeamScore,
                    AwayTeamScore = e.AwayTeamScore,
                    HomeTeamOdds = e.HomeTeamOdds,
                    AwayTeamOdds = e.AwayTeamOdds,
                    DrawOdds = e.HomeTeamOdds,
                    League = new SingleLeagueModel
                    {
                        Id = e.LeagueId,
                        Name = e.League.Name,
                    },
                    Sport = new SingleSportModel
                    {
                        Id = e.League.SportId,
                        Name = e.League.Sport.Name,
                    },
                })
                .ToListAsync();

            return new Pagination<SingleEventModel>()
            {
                PageIndex = pageIndex,
                TotalPages = totalPages,
                Result = result
            }; ;
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
                Date = @event.Date,
                HomeTeamScore = @event.HomeTeamScore,
                AwayTeamScore = @event.AwayTeamScore,
                HomeTeamOdds = @event.HomeTeamOdds,
                AwayTeamOdds = @event.AwayTeamOdds,
                DrawOdds = @event.HomeTeamOdds,
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

        public async Task<ServiceResult> UpdateAsync(int id, UpdateEventReqModel model)
        {
            if (!(await Events.AnyAsync(e => e.Id == id)))
            {
                return ServiceResult.Failed(NotFound.StatusCode, new ResultError(NotFound.NoSuchEvent));
            }

            var eventToUpdate = model.ToEntity(id);
            var eventFilledProperties = GetFilledProperties(model);

            _db.Attach(eventToUpdate);

            foreach (var property in eventFilledProperties)
            {
                _db.Entry(eventToUpdate).Property(property).IsModified = true;
            }

            await _db.SaveChangesAsync();

            return ServiceResult.Success();
        }
    }
}
