namespace Knowledge.Repositories
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Knowledge.Models.Domain;

    public interface IPostRepository
    {
        Task AddAsync(Post post);

        Task<IEnumerable<Post>> SearchAsync(string query, int currentPage, int itemsPerPage);

        Task<long> CountTotalItemsOfSearchQuery(string query);

        Task<Post> GetPostByIdAsync(string id);
    }
}