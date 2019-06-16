using System.Collections.Generic;
using System.Security.Claims;

namespace TradeX.Api.TokenProvider.Contract
{
    public interface ITokenProvider
    {
        string GenerateToken(IEnumerable<Claim> claims);
    }
}
