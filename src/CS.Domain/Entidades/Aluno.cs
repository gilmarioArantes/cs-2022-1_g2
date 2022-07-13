namespace CS.Domain.Entidades
{
    public class Aluno : Pessoa
    {
        public Guid UsuarioId { get; set; }
        public virtual Usuario Usuario { get; set; }

        public void Atualizar(string cpf, DateTime dataNascimento, string nome)
        {
            Nome = nome;
            Cpf = cpf;
            DataNascimento = dataNascimento;
        }
    }
}
