namespace Knowledge.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using AutoMapper;

    using Knowledge.Configs;
    using Knowledge.Models;
    using Knowledge.Models.Dto;
    using Knowledge.Models.Responses;
    using Knowledge.Repositories;

    public class PostService : IPostService
    {
        private const int ItemsPerPage = 20;

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

        public async Task<SearchResponse> SearchAsync(int currentPage, string query)
        {
            var results = await this.postRepository.SearchAsync(query, currentPage, ItemsPerPage);
            var posts = this.mapper.Map<IEnumerable<PostDto>>(results).ToArray();
            var totalItems = await this.postRepository.CountTotalItemsOfSearchQuery(query);

            var response = new SearchResponse(currentPage, ItemsPerPage, totalItems, posts);

            return response;
        }
    }
}