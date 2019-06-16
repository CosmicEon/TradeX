namespace TradeX.Constants.ErrorMessages
{
    public class BadRequest
    {
        public static readonly int StatusCode = 400;

        public static readonly (string, string) UserAlreadyExists = ("0872", "This email already exists.");
    }
}
