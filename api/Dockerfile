FROM mcr.microsoft.com/dotnet/sdk:9.0 AS builder

WORKDIR /app

COPY api.sln ./
COPY api/*.csproj ./api/
COPY api.Application/*.csproj ./api.Application/
COPY api.Domain/*.csproj ./api.Domain/
COPY api.Infrastructure/*.csproj ./api.Infrastructure/
COPY api.Persistance/*.csproj ./api.Persistance/

RUN dotnet restore

COPY . .
RUN dotnet publish api/api.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0

WORKDIR /app
COPY --from=builder /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "api.dll"]