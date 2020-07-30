using AutoMapper;
using ParrotWings.Data.Entities;
using ParrotWings.Data.Models;

namespace ParrotWings.Data.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<RegistrationModel, User>().ForMember(
                dest => dest.PasswordHash, 
                src => src.MapFrom(x => x.Password));
            CreateMap<User, UserModel>();
        }
    }

}
