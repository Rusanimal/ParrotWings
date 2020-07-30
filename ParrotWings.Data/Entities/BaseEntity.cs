using System;

namespace ParrotWings.Data.Entities
{
    public abstract class BaseEntity
    {
        public DateTime CreationDate { get; set; }
        public int Id { get; set; }
    }
}
