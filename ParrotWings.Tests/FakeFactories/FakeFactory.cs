using AutoFixture;
using AutoFixture.Kernel;
using System.Linq;

namespace ParrotWings.Tests.FakeFactories
{
    public class FakeFactory
    {
        public static readonly Fixture Fixture = new Fixture();

        static FakeFactory()
        {
            Fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
                .ForEach(b => Fixture.Behaviors.Remove(b));
            Fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            Fixture.Customizations
                .OfType<FilteringSpecimenBuilder>()
                .Where(x => x.Specification is ExactTypeSpecification)
                .ToList().ForEach(c => Fixture.Customizations.Remove(c));
            Fixture.Customizations
                .OfType<FilteringSpecimenBuilder>()
                .Where(x => x.Specification is ExactTypeSpecification)
                .ToList().ForEach(c => Fixture.Customizations.Remove(c));
            Fixture.Customizations
                .OfType<FilteringSpecimenBuilder>()
                .Where(x => x.Specification is ExactTypeSpecification)
                .ToList().ForEach(c => Fixture.Customizations.Remove(c));
        }

    }
}
