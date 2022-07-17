namespace CS.Application.Model
{
    public abstract class PessoaModel : BaseModel
    {
        public Guid Id { get; set; }

        public string Nome { get; set; }

        public string Cpf { get; set; }

        public decimal Peso { get; set; }

        public decimal Altura { get; set; }

        public DateTime DataNascimento { get; set; }

        public EnderecoModel Endereco { get; set; }
    }
}
