using System.Collections.Generic;

namespace TradeX.Models
{
    public class Pagination<T>
    {
        public int PageIndex { get; set; }

        public int TotalPages { get; set; }

        public IEnumerable<T> Result { get; set; }
    }
}
