namespace CS.Application.Model
{
    public abstract class BaseModel
    {
        public abstract Task<bool> EhValido();

        public abstract Task<IEnumerable<string>> ObterErros();
    }
}
