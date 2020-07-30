using System.ComponentModel.DataAnnotations;

namespace ParrotWings.Data.Models
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Enter email")]
        [RegularExpression(@"^.+@.+\..+$", ErrorMessage = "Enter correct email")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Enter password")]
        public string Password { get; set; }
    }
}
