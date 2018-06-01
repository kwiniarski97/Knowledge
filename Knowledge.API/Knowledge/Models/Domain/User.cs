namespace Knowledge.Models.Domain
{
    using System;

    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;

    public enum UserRole
    {
        Admin,

        Moderator,

        User
    }

    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Nickname { get; set; }

        public string Email { get; set; }

        public string AvatarUrl { get; set; }

        public long? FacebookId { get; set; }

        public UserRole Role { get; set; } = UserRole.User;

        public byte[] PasswordHash { get; set; }

        public byte[] Salt { get; set; }

        public int Points { get; set; } = 0;

        public DateTime CreateTime { get; } = DateTime.Now;

        public DateTime ModifcationTime { get; set; }
    }
}