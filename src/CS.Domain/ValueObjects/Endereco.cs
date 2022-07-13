using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Domain.ValueObjects
{
    public class Endereco
    {
        public Guid Id { get; set; }

        public string Logradouro { get; set; }

        public int Numero { get; set; }

        public string Complemento { get; set; }

        public string Bairro { get; set; }

        public virtual Cidade Cidade { get; set; }

        public string CEP { get; set; }

    }
}
