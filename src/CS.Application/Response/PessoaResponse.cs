namespace CS.Application.Response
{
    public abstract class PessoaResponse
    {
        public Guid Id { get; set; }

        public string Nome { get; set; }

        public string Cpf { get; set; }

        public DateTime DataNascimento { get; set; }

        public string Email { get; set; }
    }
}