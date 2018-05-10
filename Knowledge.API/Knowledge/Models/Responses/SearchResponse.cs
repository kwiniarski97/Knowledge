namespace Knowledge.Models.Responses
{
    using System.Collections.Generic;

    using Knowledge.Models.Dto;

    public class SearchResponse
    {
        public SearchResponse(int currentPage, int itemsPerPage, int totalItems, IEnumerable<PostDto> posts)
        {
            this.CurrentPage = currentPage;
            this.ItemsPerPage = itemsPerPage;
            this.TotalItems = totalItems;
            this.Posts = posts;
        }

        public int CurrentPage { get; set; }

        public int ItemsPerPage { get; set; }

        public int TotalItems { get; set; }

        public IEnumerable<PostDto> Posts { get; set; }
    }
}