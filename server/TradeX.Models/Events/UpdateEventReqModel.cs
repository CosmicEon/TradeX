using System;
using TradeX.DataAccess.Entities;

namespace TradeX.Models.Events
{
    public class UpdateEventReqModel
    {
        public string Name { get; set; }

        public DateTimeOffset Date { get; set; }

        public int HomeTeamScore { get; set; }

        public int AwayTeamScore { get; set; }

        public decimal HomeTeamOdds { get; set; }

        public decimal AwayTeamOdds { get; set; }

        public decimal DrawOdds { get; set; }

        public int LeagueId { get; set; }

        public Event ToEntity(int id)
        {
            return new Event()
            {
                Id = id,
                Name = this.Name,
                Date = this.Date,
                HomeTeamScore = this.HomeTeamScore,
                AwayTeamScore = this.AwayTeamScore,
                HomeTeamOdds = this.HomeTeamOdds,
                AwayTeamOdds = this.AwayTeamOdds,
                DrawOdds = this.DrawOdds,
                LeagueId = this.LeagueId,
            };
        }
    }
}
