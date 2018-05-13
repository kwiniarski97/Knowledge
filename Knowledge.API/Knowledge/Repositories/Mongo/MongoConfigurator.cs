namespace Knowledge.Repositories.Mongo
{
    using System.Collections.Generic;

    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Conventions;

    public class MongoConfigurator
    {
        private static bool initialized;

        public static void Initialize()
        {
            if (initialized)
            {
                return;
            }

            Configure();
        }

        private static void Configure()
        {
            BsonDefaults.GuidRepresentation = GuidRepresentation.CSharpLegacy;
            ConventionRegistry.Register("MaterialsConventions", new MongoConvention(), x => true);
            initialized = true;
        }

        private class MongoConvention : IConventionPack
        {
            public IEnumerable<IConvention> Conventions =>
                new List<IConvention>
                    {
                        new CamelCaseElementNameConvention(),
                        new EnumRepresentationConvention(BsonType.Int32),
                    };
        }
    }
}