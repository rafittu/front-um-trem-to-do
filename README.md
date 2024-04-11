# 📝 Front-end da aplicação UmTrem ToDo

###

<br>

Este projeto é uma interface para o usuário gerenciar uma lista de tarefas e afazeres diários. Com recursos que permitem criar, atualizar e excluir suas atividades com facilidade, a plataforma visa aumentar a produtividade e a organização na rotina diária.

Além disso, a aplicação realiza integração com o [servidor back-end](https://github.com/rafittu/back-um-trem-to-do) para disponibilizar recursos como autenticação de usuários, armazenamento seguro de dados e sincronização em tempo real entre dispositivos.

Inspirada na cultura mineira, onde "um trem" pode significar qualquer coisa, celebramos a riqueza regional de Minas Gerais incorporando-a em uma solução tecnológica que visa simplificar e organizar as atividades cotidianas dos usuários!

<br>

## Tecnologias

Foi utilizado as seguintes tecnologias no desenvolvimento:

- **React**: Biblioteca JavaScript para criar interfaces de usuário;
- **React Router Dom**: Biblioteca para roteamento na aplicação;
- **Prop Types**: Verificação de tipos para props em componentes React;

<br>

## Funcionalidades

A utilização da interface possui dois modos:

- Acesso sem conta: as tarefas são salvas localmente no `local storage` do navegador.
- Acesso com usuário cadastrado e autenticado: as tarefas são salvas no banco de dados da aplicação. Para utilizar nesse modo, é necessário que o [servidor back-end](https://github.com/rafittu/back-um-trem-to-do) esteja em execução.

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
$ git clone git@github.com:rafittu/front-um-trem-to-do.git
```

Instalando as dependências:

```bash
$ cd front-um-trem-to-do
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

Com a interface front-end em execução, você também pode iniciar o [servidor back-end](https://github.com/rafittu/back-um-trem-to-do) e começar a explorar as funcionalidades!

<br>

##

<p align="right">
  <a href="https://www.linkedin.com/in/rafittu/">Rafael Ribeiro 🚀</a>
</p>
