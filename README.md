# HouseBills

HouseBills é uma aplicação para controle de despesas domésticas e familiares.

## ✨ Funcionalidades

- Registro de despesas com valor, descrição e data
- Categorização por tipo de despesa
- Visualização de despesas por período
- Autenticação de usuários (em desenvolvimento)
- Interface moderna e responsiva

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React + TypeScript + Vite
- **Backend**: NestJS + Prisma + PostgreSQL
- **Infraestrutura**: Docker + Docker Compose

## 📦 Estrutura do Projeto

housebills/
├── backend/ # API NestJS com autenticação, Prisma e regras de negócio
├── frontend/ # Interface React com Vite e TypeScript
├── infra/ # Docker Compose para orquestração dos serviços


## 🚀 Como rodar o projeto

Pré-requisitos: [Node.js](https://nodejs.org/), [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/)

### 1. Clone o repositório

```bash
git clone https://github.com/JefsonOliveira/housebills.git
cd housebills
```

### 2. Suba os containers
```bash
cd infra
docker compose up --build
```

### 3. Acesse no navegador
```bash
Frontend: http://localhost:5173

Backend: http://localhost:3000
```

📚 Objetivo do Projeto:
Este projeto foi criado com o objetivo de estudo, desenvolvimento prático e como parte da minha jornada para conquistar minha primeira vaga como desenvolvedor júnior.
