using api.Application.Common.Dtos;
using api.Application.Features.Movies.Dtos;
using api.Application.Features.Users.Dtos;
using api.Domain.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Common.Mapper;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<UserProfile, CreateUserDto>().ReverseMap();
        CreateMap<UserProfile, DeleteUserDto>().ReverseMap();
        CreateMap<UserProfile, GetUserDto>().ReverseMap();
        CreateMap<MovieInfo, MovieAllInfoDto>().ReverseMap();
        CreateMap<MovieGenre, MovieGenreDto>().ReverseMap();
        CreateMap<MovieRating, MovieRatingDto>().ReverseMap();
        
        CreateMap<MovieInfo, MovieCardDto>()
            .ForMember(dest => dest.Genres, 
                opt => opt.MapFrom(src => src.Genres.Select(x => x.Name)));

        CreateMap<MovieGenre, MovieGenreDto>().ReverseMap();
    }
}
