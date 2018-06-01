namespace Knowledge.Repositories.Mongo
{
    using Knowledge.Models.Domain;
    using Knowledge.Settings;

    using Microsoft.Extensions.Options;

    using MongoDB.Driver;

    public class MongoContext
    {
        private IMongoDatabase database;

        public MongoContext(IOptions<MongoSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            this.database = client.GetDatabase("Knowledge");
        }

        public IMongoCollection<Post> Posts => this.database.GetCollection<Post>("Posts");

        public IMongoCollection<User> Users => this.database.GetCollection<User>("Users");
    }
}