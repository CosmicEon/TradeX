namespace TradeX.Constants.ErrorMessages
{
    public class NotFound
    {
        public static readonly int StatusCode = 404;

        public static readonly (string, string) NoSuchEvent = ("4021", "Event not found.");
        public static readonly (string, string) NoSuchLeague = ("4022", "League not found.");
        public static readonly (string, string) NoSuchSport = ("4023", "Sport not found.");
    }
}
