namespace Knowledge.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Knowledge.Models.Dto;
    using Knowledge.Models.Responses;

    public interface IPostService
    {
        Task AddPostAsync(PostDto post);

        Task<SearchResponse> SearchAsync(int currentPage, string query);

        Task<int> GetNumberOfItemsInSearchQueryAsync(string query);
    }
}