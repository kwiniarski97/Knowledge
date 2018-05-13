namespace Knowledge.Models.Dto
{
    using System.Collections.Generic;

    public class SearchResponseDto
    {
        public SearchResponseDto(int currentPage, int itemsPerPage, IEnumerable<PostDto> posts)
        {
            this.CurrentPage = currentPage;
            this.ItemsPerPage = itemsPerPage;
            this.Posts = posts;
        }

        public int CurrentPage { get; set; }

        public int ItemsPerPage { get; set; }

        public IEnumerable<PostDto> Posts { get; set; }
    }
}