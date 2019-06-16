using System.Security.Claims;
using System.Threading.Tasks;
using TradeX.Models.Users;
using TradeX.Services.Results;

namespace TradeX.Services.Contracts
{
    public interface IUsersService
    {
        Task<ServiceResult> CreateAsync(RegisterReqModel model);

        Task<ServiceResult<ClaimsIdentity>> PasswordSignInAsync(string email, string password);
    }
}
