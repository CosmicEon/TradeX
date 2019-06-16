using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TradeX.DataAccess.Entities
{
    public class Sport
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public ICollection<League> Leagues { get; set; } = new List<League>();
    }
}
