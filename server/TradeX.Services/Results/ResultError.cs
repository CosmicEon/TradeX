namespace TradeX.Services.Results
{
    public class ResultError
    {

        public ResultError(string description) : this(("n/a", description))
        {
        }

        public ResultError((string Code, string Description) error)
        {
            this.Code = error.Code;
            this.Description = error.Description;
        }

        public string Code { get; set; }

        public string Description { get; set; }
    }
}
