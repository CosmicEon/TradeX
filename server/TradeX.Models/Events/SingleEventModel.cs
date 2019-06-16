using System;
using TradeX.Models.Leagues;
using TradeX.Models.Sports;

namespace TradeX.Models.Events
{
    public class SingleEventModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTimeOffset Date { get; set; }

        public int HomeTeamScore { get; set; }

        public int AwayTeamScore { get; set; }

        public decimal HomeTeamOdds { get; set; }

        public decimal AwayTeamOdds { get; set; }

        public decimal DrawOdds { get; set; }

        public SingleLeagueModel League { get; set; }

        public SingleSportModel Sport { get; set; }
    }
}
