using System.ComponentModel.DataAnnotations;

namespace TradeX.Models.Users
{
    public class LoginReqModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
