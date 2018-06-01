namespace Knowledge.Repositories
{
    using System.Threading.Tasks;

    using Knowledge.Models.Domain;

    public interface IUserRepository
    {
        Task<User> GetByNicknameAsync(string nickname);

        Task AddAsync(User user);
    }
}
