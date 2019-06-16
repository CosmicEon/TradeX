using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TradeX.DataAccess.Entities
{
    public class Event
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public DateTimeOffset Date { get; set; }

        public int HomeTeamScore { get; set; }

        public int AwayTeamScore { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal HomeTeamOdds { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal AwayTeamOdds { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal DrawOdds { get; set; }

        public int LeagueId { get; set; }
        public League League { get; set; }
    }
}
