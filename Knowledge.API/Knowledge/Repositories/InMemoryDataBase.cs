namespace Knowledge.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Knowledge.Models;
    using Knowledge.Models.Domain;

    using MongoDB.Bson;

    public class InMemoryDataBase : IPostRepository
    {
        private List<Post> posts;

        public InMemoryDataBase()
        {
            this.posts = new List<Post>
                             {
                                 new Post
                                     {
                                         Description =
                                             "description placeholder longer than 30 characters",
                                         FilePath = "/",
                                         AddDateUtc = DateTime.UtcNow,
                                         MaterialType = MaterialType.Kartkowka,
                                         NumberOfDownloads = 12,
                                         Title = "title longer than 5 characers",
                                         Points = 0,
                                         School = SchoolType.Podstawowa,
                                         ThumbImagePath = "/",
                                         UserNickname = "dupa123"
                                     },
                             };
        }

        public async Task AddAsync(Post post)
        {
            this.posts.Add(post);
        }

        public async Task<IEnumerable<Post>> SearchAsync(string query, int currentPage, int itemsPerPage)
        {
            // this is simplicited for development purpouses
            return this.SearchByQuery(query).Skip((currentPage - 1) * itemsPerPage).Take(itemsPerPage);
        }

        public async Task<long> CountTotalItemsOfSearchQuery(string query)
        {
            return this.SearchByQuery(query).Count();
        }

        public async Task<Post> GetPostByIdAsync(string id)
        {
            throw new NotImplementedException();
        }

        private IEnumerable<Post> SearchByQuery(string query)
        {
            return this.posts.Where(p => p.Title.Contains(query) || p.Description.Contains(query));
        }
    }
}