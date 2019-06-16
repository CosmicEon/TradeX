namespace TradeX.Constants.ErrorMessages
{
    public class Forbidden
    {
        public static readonly int StatusCode = 403;

        public static readonly (string, string) NoAccess = ("3002", "Access Denied: insufficient rights");
    }
}
