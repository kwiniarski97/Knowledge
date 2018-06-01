namespace Knowledge.Services
{
    using System.Threading.Tasks;

    using Knowledge.Models.Dto;

    public interface IPostService
    {
        Task AddPostAsync(AddRequestDto addRequest);

        Task<SearchResponseDto> SearchAsync(int currentPage, string query);

        Task<long> GetNumberOfItemsInSearchQueryAsync(string query);

        Task<PostDto> GetPostByIdAsync(string id);
    }
}