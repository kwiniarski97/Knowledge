namespace Knowledge.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using AutoMapper;

    using Knowledge.Encryptors;
    using Knowledge.Extensions;
    using Knowledge.Models.Domain;
    using Knowledge.Models.Dto;
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

        public async Task AddPostAsync(AddRequestDto addRequest)
        {
            var filePath = string.Empty;
            var fileSnapshotImagePath = string.Empty;

            // todo dodaj && addRequest.UserNickname != null jak bedzie logowanie
            if (addRequest.EncodedFile != null && addRequest.FileName != null)
            {
                var encryptedFile = new EncryptedFile(addRequest);
                await encryptedFile.DecryptAndSaveFile();
                encryptedFile.GenerateAndSaveSnapshot();
                filePath = encryptedFile.FilePath;
                fileSnapshotImagePath = encryptedFile.SnapshotImagePath;
            }

            var post = new Post(
                addRequest.Title.ToLower().RemoveDiacritics(),
                addRequest.Description.ToLower().RemoveDiacritics(),
                addRequest.School,
                addRequest.MaterialType,
                fileSnapshotImagePath,
                filePath,
                addRequest.UserNickname);

            await this.postRepository.AddAsync(post);
        }

        // todo refractor
        public async Task<SearchResponseDto> SearchAsync(int currentPage, string query)
        {
            query = query.RemoveDiacritics().ToLower();
            var results = await this.postRepository.SearchAsync(query, currentPage, ItemsPerPage);
            var posts = this.mapper.Map<IEnumerable<PostDto>>(results).ToArray();

            var response = new SearchResponseDto(currentPage, ItemsPerPage, posts);

            return response;
        }

        public async Task<long> GetNumberOfItemsInSearchQueryAsync(string query)
        {
            return await this.postRepository.CountTotalItemsOfSearchQuery(query);
        }

        public async Task<PostDto> GetPostByIdAsync(string id)
        {
            var post = await this.postRepository.GetPostByIdAsync(id);
            var postDto = this.mapper.Map<PostDto>(post);
            return postDto;
        }
    }
}