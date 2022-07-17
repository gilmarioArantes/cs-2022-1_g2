using CS.Domain.Enums;

namespace CS.Domain.ValueObjects
{
    public class Endereco 
    {
        public string Logradouro { get; set; }

        public int Numero { get; set; }

        public string Complemento { get; set; }

        public string Bairro { get; set; }

        public string Cidade { get; set; }

        public EnumeradorEstado Estado { get; set; }

        public string CEP { get; set; }

        public void Atualizar(string logradouro, int numero, string complemento, string bairro, string cidade, EnumeradorEstado estado, string cep)
        {
            Logradouro = logradouro;
            Numero = numero;
            Complemento = complemento;
            Bairro = bairro;
            Complemento = complemento;
            Bairro = bairro;
            Cidade = cidade;
            Estado = estado;
            CEP = cep;
        }
    }
}
