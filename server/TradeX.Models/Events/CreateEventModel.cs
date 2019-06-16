using System;
using TradeX.DataAccess.Entities;

namespace TradeX.Models.Events
{
    public class CreateEventReqModel
    {
        public string Name { get; set; }

        public DateTimeOffset Date { get; set; }

        public Event ToEntity()
        {
            return new Event()
            {
                Name = this.Name,
                Date = this.Date,
            };
        }
    }
}
