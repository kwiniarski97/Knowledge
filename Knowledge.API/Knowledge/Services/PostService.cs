namespace Knowledge.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using AutoMapper;

    using Knowledge.Configs;
    using Knowledge.Models;
    using Knowledge.Models.Dto;
    using Knowledge.Repositories;

    public class PostService : IPostService
    {
        private IPostRepository postRepository;

        private IMapper mapper;

        public PostService(IPostRepository postRepository, IMapper mapper)
        {
            this.postRepository = postRepository;
            this.mapper = mapper;
        }

        public async Task AddPostAsync(PostDto postDto)
        {
            var post = this.mapper.Map<Post>(postDto);
            await this.postRepository.AddAsync(post);
        }

        public async Task<IEnumerable<PostDto>> SearchAsync(string query)
        {
            var results = await this.postRepository.SearchAsync(query);
            var posts = this.mapper.Map<IEnumerable<PostDto>>(results);
            return posts;
        }
    }
}
