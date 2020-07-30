using System.ComponentModel.DataAnnotations;

namespace ParrotWings.Data.Models
{
    public class CreateTransactionModel
    {
        [Required(ErrorMessage = "Enter amount")]
        public decimal? Amount { get; set; }
        [Required(ErrorMessage = "Select correspondent")]
        public int? CorrespondentId { get; set; }
        public string CorrespondentName { get; set; }
    }
}
