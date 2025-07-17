# Desafio 01 - Sistema de Gerenciamento de Tarefas

## Descrição do Projeto

O **Sistema de Gerenciamento de Tarefas** é uma aplicação desenvolvida como parte do **Desafio 01**, com o objetivo de oferecer uma solução eficiente para o gerenciamento de tarefas. A aplicação permite criar, listar, atualizar, excluir e marcar tarefas como concluídas, utilizando uma API RESTful simples e intuitiva. O projeto foi construído com foco em boas práticas de desenvolvimento, como modularidade e escalabilidade, e utiliza armazenamento local para persistência de dados.

## Funcionalidades

- **Criar Tarefa**: Adicione novas tarefas com título, descrição e status.
- **Listar Tarefas**: Visualize todas as tarefas ou filtre por status (concluídas ou pendentes).
- **Ver Tarefa Específica**: Consulte os detalhes de uma tarefa pelo seu ID.
- **Atualizar Tarefa**: Edite o título ou descrição de uma tarefa existente.
- **Excluir Tarefa**: Remova uma tarefa do sistema.
- **Marcar como Concluída**: Altere o status de uma tarefa para concluída ou pendente.
- **Importação de Tarefas via CSV**: Importe tarefas em massa a partir de um arquivo CSV.

## Tecnologias Utilizadas

- **Linguagem**: JavaScript (Node.js)
- **Banco de Dados**: Armazenamento local (JSON-based)
- **Dependências**:
  - `csv`: ^6.4.1 (para importação de arquivos CSV)

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter o seguinte instalado:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Git](https://git-scm.com/) (para clonar o repositório)

## Como Executar o Projeto

Siga os passos abaixo para configurar e executar a aplicação localmente:

1. **Clone o repositório**:

   ```bash
   git clone [URL_DO_REPOSITORIO]
   ```

2. **Acesse o diretório do projeto**:

   ```bash
   cd nome-do-projeto
   ```

3. **Instale as dependências**:

   ```bash
   npm install
   ```

4. **Execute a aplicação**:

   ```bash
   npm run dev
   ```

5. **Importe tarefas via CSV** (se necessário):

   ```bash
   npm run import-csv
   ```

6. **Acesse a API**:
   A API estará disponível em `http://localhost:3333/tasks`. Utilize ferramentas como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) para testar as rotas.

## Estrutura do Projeto

```plaintext
nome-do-projeto/
├── src/                         # Código-fonte da aplicação
│   ├── csv-import-async/        # Scripts para importação de arquivos CSV
│   ├── database.js              # Módulo de gerenciamento do banco de dados
│   ├── server.js                # Configuração do servidor Node.js
│   ├── utils/                   # Funções utilitárias (ex.: buildRoutePath)
├── package.json                 # Configurações do projeto e dependências
├── README.md                    # Documentação do projeto
└── [outros arquivos]            # Arquivos de configuração e dados
```

## Como Usar a API

Abaixo estão exemplos de como interagir com as principais rotas da API:

### Criar uma Tarefa

```http
POST http://localhost:3333/tasks HTTP/1.1
Content-Type: application/json

{
    "title": "Estudar Node.js",
    "description": "Revisar fundamentos de Node.js e APIs REST"
}
```

**Resposta**: `201 Created`

### Listar Todas as Tarefas

```http
GET http://localhost:3333/tasks HTTP/1.1
```

**Parâmetro Opcional**: `?search=termo` (filtra por título ou descrição)  
**Resposta**: `200 OK` com a lista de tarefas em formato JSON.

### Ver Tarefa Específica

```http
GET http://localhost:3333/tasks/:id HTTP/1.1
```

**Exemplo**:

```http
GET http://localhost:3333/tasks/72391594-b32f-4992-bdb3-bf2b7a2534dc HTTP/1.1
```

**Resposta**: `200 OK` com os detalhes da tarefa ou `404 Not Found` se não encontrada.

### Atualizar Tarefa

```http
PUT http://localhost:3333/tasks/:id HTTP/1.1
Content-Type: application/json

{
    "title": "Estudar Node.js Avançado",
    "description": "Explorar middlewares e autenticação"
}
```

**Resposta**: `204 No Content` ou `404 Not Found` se a tarefa não existir.

### Excluir Tarefa

```http
DELETE http://localhost:3333/tasks/:id HTTP/1.1
```

**Exemplo**:

```http
DELETE http://localhost:3333/tasks/e39fa7da-2a30-4bc5-968c-12b1fb832c3f HTTP/1.1
```

**Resposta**: `204 No Content` ou `404 Not Found` se a tarefa não existir.

### Marcar/Desmarcar Tarefa como Concluída

```http
PATCH http://localhost:3333/tasks/:id HTTP/1.1
Content-Type: application/json
```

**Exemplo**:

```http
PATCH http://localhost:3333/tasks/72391594-b32f-4992-bdb3-bf2b7a2534dc HTTP/1.1
```

**Resposta**: `204 No Content` ou `404 Not Found` se a tarefa não existir.

### Importar Tarefas via CSV

Execute o comando abaixo para importar tarefas a partir de um arquivo CSV:

```bash
npm run import-csv
```

**Formato do CSV**:

```csv
title,description
"Estudar JavaScript","Revisar conceitos de ES6"
"Reunião","Planejar sprint"
```

## Contribuições

Contribuições são bem-vindas! Para contribuir, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. Commit suas alterações:
   ```bash
   git commit -m 'Adiciona nova funcionalidade'
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin feature/nova-funcionalidade
   ```
5. Abra um Pull Request no repositório original.

## Licença

Este projeto está licenciado sob a licença [MIT](LICENSE).

## Contato

Para dúvidas ou sugestões, entre em contato com o mantenedor do projeto ou abra uma issue no repositório.

---

**Desenvolvido com 💻 e ☕ por Carlos Viana**
