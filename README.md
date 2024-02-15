# 📝 Front-end da aplicação To-Do List!

###

<br>

Este projeto consiste na interface do usuário (front-end) como parte de um [desafio técnico](https://github.com/keevosoftwares/desafio-fullstack) para gerenciar uma lista de tarefas.

Ele se integra com o [back-end da aplicação](https://github.com/rafittu/keevo-back-to-do) para fornecer uma solução completa ao usuário!

<br>

## Tecnologias

Foi utilizado as seguintes tecnologias no desenvolvimento:

- **React**: Biblioteca JavaScript para criar interfaces de usuário;
- **React Router Dom**: Biblioteca para roteamento na aplicação;
- **Axios**: Cliente HTTP baseado em promises para fazer requisições AJAX;
- **Prop Types**: Verificação de tipos para props em componentes React;

<br>

## Funcionalidades

A utilização da interface possui dois modos:

- Acesso sem conta: as tarefas são salvas localmente no `local storage` do navegador.
- Acesso com usuário cadastrado e autenticado: as tarefas são salvas no banco de dados da aplicação. Para utilizar nesse modo, é necessário que o [servidor back-end](https://github.com/rafittu/keevo-back-to-do) esteja em execução.

<br>

Para ambos os modos, o usuário conta com os seguintes serviços:

- Cadastrar uma nova tarefa.
- Visualizar a lista de tarefas.
- Filtrar tarefas por:
    - **Prioridade**;
    - **Data de vencimento**;
    - **Status**;
- Editar uma tarefa existente.
- Excluir uma tarefa.

<br>

## Instalação

Clonando o repositório:

```bash
$ git clone git@github.com:rafittu/keevo-front-to-do.git
```

Instalando as dependências:

```bash
$ cd front-to-do
$ npm install
```

<br>

## Iniciando o app

Crie um arquivo `.env` na raiz do projeto e preencha as informações de acordo com o arquivo `.env.example` disponível.

Iniciando o servidor:

```bash
# modo de desenvolvimento
$ npm run start
```

<br>

## Uso

Com a interface front-end em execução, você também pode iniciar o [servidor back-end](https://github.com/rafittu/keevo-back-to-do) e começar a explorar as funcionalidades!

<br>

##

<p align="right">
  <a href="https://www.linkedin.com/in/rafittu/">Rafael Ribeiro 🚀</a>
</p>
