using AutoFixture.AutoMoq;
using AutoFixture.Xunit2;

namespace ParrotWings.Tests.FakeFactories
{
    public class AutoMoqDataAttribute : AutoDataAttribute
    {
        public AutoMoqDataAttribute()
            : base(() => FakeFactory.Fixture.Customize(new AutoMoqCustomization()))
        {
        }
    }
}
