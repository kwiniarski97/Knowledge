namespace Knowledge.Controllers
{
    using System.Threading.Tasks;

    using Knowledge.Models.Dto;
    using Knowledge.Services;

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

        [HttpPost("add")]
        public async Task<IActionResult> AddAsync([FromBody] PostDto postDto)
        {
            await this.postService.AddPostAsync(postDto);
            return this.Ok();
        }

        [HttpGet("search/{query}")]
        public async Task<IActionResult> SimpleSearchAsync(string query)
        {
            var posts = await this.postService.SearchAsync(query);
            return this.Ok(posts);
        }
    }
}