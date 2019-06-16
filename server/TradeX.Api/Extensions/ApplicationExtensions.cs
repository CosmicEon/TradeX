using Microsoft.AspNetCore.Builder;
using Swashbuckle.AspNetCore.SwaggerUI;
using TradeX.Api.Middlewares;

namespace TradeX.Api.Extensions
{
    public static class ApplicationExtensions
    {
        public static IApplicationBuilder ConfigureCustomExceptionMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ExceptionMiddleware>();
        }

        public static IApplicationBuilder UseSwaggerDocumentation(this IApplicationBuilder builder)
        {
            return builder
                .UseSwagger()
                .UseSwaggerUI(s =>
                {
                    //s.RoutePrefix = "swagger";
                    s.SwaggerEndpoint("/swagger/v1/swagger.json", "V1");

                    s.DocumentTitle = "TradeX Api";
                    s.DocExpansion(DocExpansion.None);
                });
        }
    }
}
