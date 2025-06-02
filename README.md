🚀 NestJS Application
Este projeto é uma API desenvolvida com NestJS, um framework moderno e eficiente para aplicações Node.js.

📦 Tecnologias Utilizadas
NestJS

TypeScript

Docker

Docker Compose

PostgreSQL (ou o banco utilizado)

⚙️ Como rodar o projeto localmente
Certifique-se de ter o Node.js (v18+), npm e Docker instalados em sua máquina.

1. Clone o repositório
```
git clone https://github.com/LucasMaciel404/Challenger-Avantsoft-API.git
cd Challenger-Avantsoft
```
2. Instale as dependências
```
npm install
```
3. Configure o ambiente
Crie um arquivo .env na raiz com as variáveis necessárias. Exemplo:
```
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=lucas
DB_PASSWORD=lucas123
DB_NAME=lucasDatabase

```
4. Rode a aplicação
```
npm run start:dev
```
A aplicação estará disponível em: http://localhost:3000

🐳 Como rodar com Docker Compose[inicia o postgres e a api]
1. Buildar os containers
```
docker-compose build
```
2. Subir os serviços
```
docker-compose up
```
Isso irá iniciar a aplicação NestJS e o banco de dados definidos no docker-compose.yml.

A API estará disponível em: http://localhost:3000

3. Parar os serviços
```
docker-compose down
```
Use docker-compose down -v se quiser remover os volumes também.
