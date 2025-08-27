# api-rocketlog

A API rocketlog simula um servico de delivery. Foi escrita com Express, Node, TypeScript, Prisma, Docker e utiliza a biblioteca de testes jest.js para implementar testes automatizados.



Para utilizar o projeto em sua maquina rode os seguintes comandos:

### Clone o Repositorio
`git clone https://github.com/thepedrodev/api-rocketlog`

`cd projeto`
`

### Instalar as dependencias: 
`npm run buid`

### Configure as variaveis de ambiente
`cp .env-example .env`

**exemplo de configuracao**: 
`DATABASE_URL="postgresql://user:password@localhost:5432/meubanco"`


### Gerar as tabelas:
`npx prisma generate`

### Criar as tabelas:
`npx prisma migrate dev`

### Rodar o projeto`
`npm run build`

`npm run start`
