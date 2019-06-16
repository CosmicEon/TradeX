using System.ComponentModel.DataAnnotations;
using TradeX.DataAccess.Entities;

namespace TradeX.Models.Users
{
    public class RegisterReqModel
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public User ToEntity(string passwordHash)
        {
            return new User()
            {
                FirstName = FirstName,
                LastName = LastName,
                Email = this.Email,
                PasswordHash = passwordHash,
            };
        }
    }
}
