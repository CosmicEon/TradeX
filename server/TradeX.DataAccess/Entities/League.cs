using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TradeX.DataAccess.Entities
{
    public class League
    {
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }

        public int SportId { get; set; }
        public Sport Sport { get; set; }

        public ICollection<Event> Events { get; set; } = new List<Event>();
    }
}
