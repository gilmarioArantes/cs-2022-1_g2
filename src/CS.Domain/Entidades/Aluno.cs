namespace CS.Domain.Entidades
{
    public class Aluno : Pessoa
    {
        public Guid UsuarioId { get; set; }
        public virtual Usuario Usuario { get; set; }

        public decimal Peso { get; set; }
        public decimal Altura { get; set; }

        public void Atualizar(string cpf, DateTime dataNascimento, string nome, decimal peso, decimal altura)
        {
            Nome = nome;
            Cpf = cpf;
            DataNascimento = dataNascimento;
            Peso = peso;
            Altura = altura;
        }
    }
}
