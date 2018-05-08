namespace Knowledge.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Knowledge.Models;

    public class InMemoryDataBase : IPostRepository
    {
        private List<Post> posts;

        public InMemoryDataBase()
        {
            this.posts = new List<Post>
                             {
                                 new Post
                                     {
                                         Description = "description placeholder longer than 30 characters",
                                         FilePath = "/",
                                         AddDateUtc = DateTime.UtcNow,
                                         Id = 0,
                                         MaterialType = MaterialType.Kartkowka,
                                         NumberOfDownloads = 12,
                                         Title = "title longer than 5 characers",
                                         Points = 0,
                                         School = SchoolType.Podstawowa,
                                         ThumbImagePath = "/",
                                         User = new User(){Nickname = "dupa123"}
                                     },
                             };
        }

        public async Task AddAsync(Post post)
        {
             this.posts.Add(post);
        }

        public async Task<IEnumerable<Post>> SearchAsync(string query)
        {
            // this is simplicited for development purpouses
            return this.posts.Where(p => p.Title.Contains(query) || p.Description.Contains(query));
        }
    }
}
