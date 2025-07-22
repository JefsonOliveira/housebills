# Usar imagem base leve com Node.js
FROM node:18-alpine

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar apenas os arquivos de dependência
COPY package*.json ./

# Instalar as dependências
RUN npm install

#Copiar o restante do projeto
COPY . .

# Expor a porta que o NestJS usa por padrão
EXPOSE 3000

#Comando para rodar o app (modo desenvolvimento)
CMD ["npm", "run", "start:dev"]
