namespace Knowledge.Controllers
{
    using System.Threading.Tasks;

    using Knowledge.Models.Dto;
    using Knowledge.Services;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Produces("application/json")]
    [Route("api/Post")]
    public class PostController : Controller
    {
        private IPostService postService;

        public PostController(IPostService postService)
        {
            this.postService = postService;
        }

        [Authorize("Active")]
        [HttpPost("add")]
        public async Task<IActionResult> AddAsync([FromBody] AddRequestDto addRequest)
        {
            await this.postService.AddPostAsync(addRequest);
            return this.Ok();
        }

        [HttpGet("search/{currentPage}/{query}")]
        public async Task<IActionResult> SimpleSearchAsync(int currentPage, string query)
        {
            var posts = await this.postService.SearchAsync(currentPage, query);
            return this.Ok(posts);
        }

        [HttpGet("count/{query}")]
        public async Task<IActionResult> GetNumberOfPostsInQueryAsync(string query)
        {
            var number = await this.postService.GetNumberOfItemsInSearchQueryAsync(query);
            return this.Ok(value: number);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostByIdAsync(string id)
        {
            var post = await this.postService.GetPostByIdAsync(id);
            return this.Ok(post);
        }
    }
}