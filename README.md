# BookVault 📚

Este projeto é uma API para gerenciamento de livros. Inclui funcionalidades de CRUD (Create, Read, Update, Delete) e paginação.

## Executar o projeto com Docker

### 1. Build
Na raiz do projeto rode o comando para fazer o build do projeto:

```bash
docker-compose build
```
### 2. Executar
Execute o projeto com:

```bash
docker-compose up -d
```
### 2. Executar as migrations
Execute o projeto com:

```bash
docker exec -it api php artisan migrate
```
## Api

### Rota base

```bash
localhost:8000/api
```
### Listagem de livros

```bash
localhost:8000/api/books
```

Método
```bash
POST
```

Parâmetros para busca, se não for definido retorna a busca completa:

```json
{
    "title" : ""
}
```

### Adicionar Livro

```bash
localhost:8000/api/books/new
```

Método
```bash
POST
```

Parâmetros:
```json
{
    "title": "Teste",
    "author": "Teste Author",
    "description": "Cool",
    "published_date": "2021-01-12",
    "isbn": "ejhfoh98yfrtbefwefghdtgfeswhrrh"
}
```
### Buscar livro pelo ID

```bash
localhost:8000/api/books/{bookId}
```

Método
```bash
GET
```

### Atualizar Livro

```bash
localhost:8000/api/books/{bookId}/update
```

Método
```bash
PUT
```

Parâmetros:
```json
{
    "title": "Teste",
    "author": "Teste Author",
    "description": "Cool",
    "published_date": "2021-01-12",
    "isbn": "ejhfoh98yfrtbefwefghdtgfeswhrrh"
}
```

### Deletar Livro

```bash
localhost:8000/api/books/{bookId}/delete
```

Método
```bash
DELETE
```

## APP

### Listagem

```bash
localhost:3000
```

### Novo Livro

```bash
localhost:3000/new-book
```
### Detalhes

```bash
localhost:3000/details-book/{bookId}
```

### Editar

```bash
localhost:3000/edit-book/{bookId}
```

### Editar

Está na página de Detalhes
