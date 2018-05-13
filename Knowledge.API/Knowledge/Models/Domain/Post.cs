namespace Knowledge.Models
{
    using System;

    using Knowledge.Resources;

    public class Post
    {
        private string title;

        private string description;

        private string filePath;

        public Post(
            string title,
            string description,
            string filePath,
            SchoolType school,
            MaterialType materialType,
            string thumbImagePath,
            string userNickname)
        {
            this.Title = title;
            this.Description = description;
            this.FilePath = filePath;
            this.School = school;
            this.MaterialType = materialType;
            this.ThumbImagePath = thumbImagePath;
            this.UserNickname = userNickname;
        }

        public Post()
        {
        }

        public long Id { get; set; }

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

        public SchoolType School { get; set; }

        public MaterialType MaterialType { get; set; }

        public string ThumbImagePath { get; set; }

        public string FilePath { get; set; }

        public int Points { get; set; } = 0;

        public uint NumberOfDownloads { get; set; } = 0;

        public string UserNickname { get; set; }

        public DateTime AddDateUtc { get; set; } = DateTime.UtcNow;
    }
}