﻿namespace Knowledge.Models.Dto
{
    using System;

    public class PostDto
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public SchoolType School { get; set; }

        public MaterialType MaterialType { get; set; }

        public string ThumbImagePath { get; set; }

        public string FilePath { get; set; }

        public int Points { get; set; }

        public uint NumberOfDownloads { get; set; }

        public string UserNickname { get; set; }

        public string SimplifiedTitle { get; set; }

        public DateTime AddDateUtc { get; set; }
    }
}
