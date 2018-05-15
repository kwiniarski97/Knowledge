namespace Knowledge.Repositories
{
    using System.Collections.Generic;
    using System.Runtime.InteropServices;
    using System.Text;
    using System.Threading.Tasks;

    using Knowledge.Models.Domain;
    using Knowledge.Repositories.Mongo;

    using Microsoft.Extensions.Options;

    using MongoDB.Bson;
    using MongoDB.Driver;

    public class PostRepositoryMongo : IPostRepository
    {
        private MongoContext context;

        public PostRepositoryMongo(IOptions<MongoSettings> settings)
        {
            this.context = new MongoContext(settings);
        }

        public async Task AddAsync(Post post)
        {
            await this.context.Posts.InsertOneAsync(post);
        }

        public async Task<IEnumerable<Post>> SearchAsync(string query, int currentPage, int itemsPerPage)
        {
            var filter = Builders<Post>.Filter.Where(post => post.SearchTags.Contains(query));
            return await this.context.Posts.Find(filter).ToListAsync();
        }

        public async Task<long> CountTotalItemsOfSearchQuery(string query)
        {
            return await this.context.Posts.CountAsync(filter => filter.SearchTags.Contains(query));
        }

        public async Task<Post> GetPostByIdAsync(string id)
        {
            var filter = Builders<Post>.Filter.Where(post => post.Id.Equals(id));
            return await this.context.Posts.Find(filter).SingleAsync();
        }
    }
}