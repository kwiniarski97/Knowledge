namespace Knowledge.Models.Dto
{
    public class AddRequestDto
    {
        public string Title { get; set; }

        public SchoolType School { get; set; }

        public MaterialType MaterialType { get; set; }

        public string UserNickname { get; set; }

        public string Description { get; set; }

        public string FileName { get; set; }

        public string EncodedFile { get; set; }
    }
}