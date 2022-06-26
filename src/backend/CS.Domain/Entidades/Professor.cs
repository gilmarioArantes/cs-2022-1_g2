namespace CS.Domain.Entidades
{
    public class Professor : Pessoa
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
