namespace Knowledge.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Knowledge.Models.Dto;

    public interface IPostService
    {
        Task AddPostAsync(AddRequestDto addRequest);

        Task<SearchResponseDto> SearchAsync(int currentPage, string query);

        Task<int> GetNumberOfItemsInSearchQueryAsync(string query);
    }
}