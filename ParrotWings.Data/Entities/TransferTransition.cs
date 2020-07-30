using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ParrotWings.Data.Entities
{
    public class TransferTransaction : BaseEntity
    {
        public int? RecipientId { get; set; }
        public int? SenderId { get; set; }
        [ForeignKey("RecipientId")]
        public virtual User Recipient { get; set; }
        [ForeignKey("SenderId")]
        public virtual User Sender { get; set; }
        public virtual List<Balance> Balance { get; set; }
    }
}
