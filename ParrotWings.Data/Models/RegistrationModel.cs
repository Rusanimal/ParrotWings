using System.ComponentModel.DataAnnotations;

namespace ParrotWings.Data.Models
{
    public class RegistrationModel
    {
        [Required(ErrorMessage = "Enter confirm password")]
        [Compare("Password", ErrorMessage = "Passwords not equeal")]

        public string ConfirmPassword { get; set; }
        [Required(ErrorMessage = "Enter email")]
        [RegularExpression(@"^.+@.+\..+$", ErrorMessage = "Enter correct email")]

        public string Email { get; set; }
        [Required(ErrorMessage = "Enter name")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Enter password")]
        public string Password { get; set; }
    }
}
