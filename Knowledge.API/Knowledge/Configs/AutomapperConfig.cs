namespace Knowledge.Configs
{
    using AutoMapper;

    using Knowledge.Models.Domain;
    using Knowledge.Models.Dto;

    public class AutomapperConfig : Profile
    {
        public AutomapperConfig()
        {
            this.CreateMap<Post, PostDto>();
            this.CreateMap<PostDto, Post>();
        }
    }
}