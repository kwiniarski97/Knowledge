namespace Knowledge.Services
{
    using System.Collections;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Knowledge.Models.Dto;

    public interface IPostService
    {
        Task AddPostAsync(PostDto post);

        Task<IEnumerable<PostDto>> SearchAsync(string query);
    }
}