namespace Knowledge.Repositories
{
    using System.Threading.Tasks;

    using Knowledge.Models.Domain;
    using Knowledge.Repositories.Mongo;
    using Knowledge.Settings;

    using Microsoft.Extensions.Options;

    using MongoDB.Driver;

    public class UserRepositoryMongo : IUserRepository
    {
        private MongoContext context;

        public UserRepositoryMongo(IOptions<MongoSettings> settings)
        {
            this.context = new MongoContext(settings);
        }

        public async Task<User> GetByNicknameAsync(string nickname)
        {
            var filter = Builders<User>.Filter.Where(user => user.Nickname.Equals(nickname));
            return (await this.context.Users.FindAsync(filter)).FirstOrDefault();
        }

        public async Task AddAsync(User user)
        {
            await this.context.Users.InsertOneAsync(user);
        }
    }
}
