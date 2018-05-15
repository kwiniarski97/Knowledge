namespace Knowledge.Models.Domain
{
    using System;

    using Knowledge.Extensions;
    using Knowledge.Resources;

    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;

    public class Post
    {
        private string title;

        private string description;

        public Post(
            string title,
            string description,
            SchoolType school,
            MaterialType materialType,
            string thumbImagePath,
            string filePath,
            string userNickname)
        {
            this.Title = title;
            this.Description = description;
            this.School = school;
            this.MaterialType = materialType;
            this.ThumbImagePath = thumbImagePath;
            this.FilePath = filePath;
            this.UserNickname = userNickname;
            this.GenerateSimplifiedTitle();
            this.GenerateSearchTags();
        }

        public Post()
        {
        }

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Title
        {
            get => this.title;
            set
            {
                if (string.IsNullOrWhiteSpace(value) || value.Length < 5)
                {
                    throw new Exception(Strings.titleTooShortMessage);
                }

                this.title = value;
            }
        }

        public string SimplifiedTitle { get; set; }

        public string Description
        {
            get => this.description;
            set
            {
                if (string.IsNullOrWhiteSpace(value) || value.Length < 30)
                {
                    throw new Exception(Strings.descriptionTooShortMessage);
                }

                this.description = value;
            }
        }

        public string SearchTags { get; set; }

        public SchoolType School { get; set; }

        public MaterialType MaterialType { get; set; }

        public string ThumbImagePath { get; set; }

        public string FilePath { get; set; }

        public int Points { get; set; } = 0;

        public uint NumberOfDownloads { get; set; } = 0;

        public string UserNickname { get; set; }

        public DateTime AddDateUtc { get; set; } = DateTime.UtcNow;

        private void GenerateSimplifiedTitle()
        {
            var temp = this.Title.ToLower().RemoveDiacritics().Replace(" ", "_");
            temp += DateTime.UtcNow.Ticks.ToString();
            this.SimplifiedTitle = temp;
        }

        private void GenerateSearchTags()
        {
            this.SearchTags = string.Join(
                ' ',
                this.Title.RemoveDiacritics().ToLower(),
                this.SimplifiedTitle,
                this.UserNickname,
                this.Description.RemoveDiacritics().ToLower(),
                this.School.ToString().ToLower(),
                this.MaterialType.ToString().ToLower());
        }
    }
}