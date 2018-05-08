namespace Knowledge.Repositories
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Knowledge.Models;

    public interface IPostRepository
    {
        Task AddAsync(Post post);

        Task<IEnumerable<Post>> SearchAsync(string query);
    }
}