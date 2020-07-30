using System.ComponentModel.DataAnnotations;

namespace ParrotWings.Data.Entities
{
    public class User : BaseEntity
    {
        [Required]
        [StringLength(50)]
        public string Email { get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        [Required]
        public string PasswordHash { get; set; }
    }
}