using System.ComponentModel.DataAnnotations.Schema;

namespace ParrotWings.Data.Entities
{
    public class Balance : BaseEntity
    {
        [Column(TypeName = "decimal(20, 2)")]
        public decimal Amount { get; set; }
        public int? TransferTransactionId { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        [ForeignKey("TransferTransactionId")]
        public virtual TransferTransaction TransferTransaction { get; set; }
    }
}
