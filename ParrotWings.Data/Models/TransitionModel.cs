namespace ParrotWings.Data.Models
{
    using System;

    namespace ParrotWings.Data.Models
    {
        public class TransitionModel
        {
            public decimal Amount { get; set; }
            public int BalanceId { get; set; }
            public string CorrespondentName { get; set; }
            public DateTime CreationDate { get; set; }
            public decimal ResultingBalance { get; set; }
            public int TransitionId { get; set; }
        }
    }

}
