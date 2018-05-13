namespace Knowledge.Repositories.Mongo
{
    using Knowledge.Models;
    using Knowledge.Models.Domain;

    using Microsoft.Extensions.Options;

    using MongoDB.Bson;
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
    }
}