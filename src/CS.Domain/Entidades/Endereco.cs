using CS.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Domain.Entidades
{
    public class Endereco
    {
        public string Logradouro { get; set; }

        public int Numero { get; set; }

        public string Complemento { get; set; }

        public string Bairro { get; set; }

        public Cidade Cidade { get; set; }

        public CEP CEP { get; set; }

    }
}
