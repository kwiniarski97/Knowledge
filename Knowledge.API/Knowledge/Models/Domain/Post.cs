namespace Knowledge.Models
{
    using System;

    using Knowledge.Resources;

    public class Post
    {
        private long id;

        private string title;

        private string description;

        private string filePath;

        public long Id
        {
            get => this.id;
            set => this.id = value;
        }

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

        public string FilePath
        {
            get => this.filePath;
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                {
                    throw new Exception(Strings.errorWhenAddingFile);
                }

                this.filePath = value;
            }
        }

        public int Points { get; set; } = 0;

        public uint NumberOfDownloads { get; set; } = 0;

        public User User { get; set; }

        public DateTime AddDateUtc { get; set; } = DateTime.UtcNow;
    }
}