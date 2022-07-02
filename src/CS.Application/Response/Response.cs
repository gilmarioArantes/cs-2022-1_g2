using Newtonsoft.Json;

namespace CS.Application.Response
{
    public abstract class Response<T>
    {
        [JsonProperty("success")]
        public bool Success { get; set; }

        [JsonProperty("data")]
        public T Data { get; set; }
    }
}
