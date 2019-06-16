using CryptoHelper;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Threading.Tasks;
using TradeX.Constants;
using TradeX.Constants.ErrorMessages;
using TradeX.DataAccess;
using TradeX.DataAccess.Entities;
using TradeX.Models.Users;
using TradeX.Services.Contracts;
using TradeX.Services.Results;

namespace TradeX.Services
{
    public class UsersService : BaseService, IUsersService
    {
        public UsersService(TradeXContext db) : base(db)
        {
        }

        public async Task<ServiceResult> CreateAsync(RegisterReqModel model)
        {
            if (await _db.Users.AnyAsync(u => u.Email == model.Email))
            {
                return ServiceResult.Failed(BadRequest.StatusCode, new ResultError(BadRequest.UserAlreadyExists));
            }

            var hashedPassword = Crypto.HashPassword(model.Password);
            var user = model.ToEntity(hashedPassword);

            await _db.Users.AddAsync(user);
            await _db.SaveChangesAsync();

            return ServiceResult.Success();
        }

        public async Task<ServiceResult<ClaimsIdentity>> PasswordSignInAsync(string email, string password)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email.Equals(email));

            if (user == null)
            {
                return ServiceResult<ClaimsIdentity>.Failed(Unauthorized.StatusCode, new ResultError(Unauthorized.InvalidLogin));
            }

            var hashedPassword = Crypto.HashPassword(password);

            if (!Crypto.VerifyHashedPassword(hashedPassword, password))
            {
                return ServiceResult<ClaimsIdentity>.Failed(Unauthorized.StatusCode, new ResultError(Unauthorized.InvalidLogin));
            }

            return ServiceResult<ClaimsIdentity>.Success(this.GenerateClaims(user));
        }

        private ClaimsIdentity GenerateClaims(User user)
        {
            var userId = user.Id.ToString();
            var email = user.Email;
            var role = "Admin";

            var id = new ClaimsIdentity("TradeX", TradeXClaimTypes.Email, TradeXClaimTypes.Role);
            id.AddClaim(new Claim(TradeXClaimTypes.Id, userId));
            id.AddClaim(new Claim(TradeXClaimTypes.Email, email));
            id.AddClaim(new Claim(TradeXClaimTypes.Role, role));

            return id;
        }
    }
}
