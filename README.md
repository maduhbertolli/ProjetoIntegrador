# 🎬 CineEstação

O **CineEstação** é um aplicativo mobile desenvolvido como Projeto Integrador. O objetivo do projeto é permitir que usuários consultem filmes e interajam com eles através de avaliações por estrelas e outras informações.

O aplicativo foi desenvolvido utilizando **React Native**, com uma estrutura organizada em telas, componentes reutilizáveis e serviços para armazenamento de dados.

---

## 🚀 Funcionalidades

### 🎬 Listagem de filmes

O aplicativo possui uma tela para visualizar os filmes cadastrados.

Na listagem, o usuário consegue visualizar os filmes disponíveis e selecionar um filme para consultar mais informações.

---

### ➕ Cadastro de filmes

É possível adicionar novos filmes ao aplicativo.

O cadastro permite inserir as informações necessárias para que o filme fique disponível na lista.

---

### 🔎 Detalhes do filme

Ao selecionar um filme, o usuário pode acessar uma tela com informações detalhadas.

Essa tela é responsável por apresentar as informações do filme e permitir a interação do usuário com a avaliação.

---

### ⭐ Avaliação por estrelas

O aplicativo possui um componente de estrelas para representar a avaliação dos filmes.

O usuário pode selecionar a quantidade de estrelas para registrar sua avaliação.

---

### 🎨 Escolha de cores

O projeto possui um componente chamado `EscolherCor.js`, utilizado para trabalhar com a escolha de cores dentro da aplicação.

---

### 💾 Armazenamento de dados

O projeto possui um serviço de armazenamento localizado em:

```text
src/services/storage.js
```

Esse serviço é responsável pela parte de persistência/armazenamento utilizada pela aplicação.

---

## 📁 Estrutura do projeto

```text
ProjetoIntegrador/
│
└── cineestacao-projetointegrador/
    │
    ├── assets/
    │
    ├── src/
    │   │
    │   ├── components/
    │   │   ├── EscolherCor.js
    │   │   └── Estrelas.js
    │   │
    │   ├── screens/
    │   │   ├── AdicionarFilmesScreen.js
    │   │   ├── DetalhesFilmesScreen.js
    │   │   └── ListarFilmesScreen.js
    │   │
    │   └── services/
    │       └── storage.js
    │
    ├── .gitignore
    ├── AGENTS.md
    ├── App.js
    ├── CLAUDE.md
    ├── app.json
    ├── index.js
    ├── package.json
    └── package-lock.json
```

A estrutura acima corresponde aos diretórios e arquivos atualmente presentes no repositório.

--

## ⚛️ Tecnologias utilizadas

* **React Native**
* **JavaScript**
* **Node.js / npm**
* **Componentes reutilizáveis**
* **Persistência de dados**

---
## 🎯 Objetivo do projeto

O CineEstação foi desenvolvido com o objetivo de aplicar na prática conceitos de desenvolvimento mobile, organização de código, criação de componentes, navegação entre telas e armazenamento de informações.

A proposta é criar uma experiência simples para que o usuário possa **visualizar filmes, cadastrar novos filmes, consultar detalhes e avaliar filmes através de estrelas**.

---

## 👩‍💻 Projeto Integrador

**Projeto:** CineEstação
**Repositório:** `maduhbertolli/ProjetoIntegrador`

Desenvolvido como parte do Projeto Integrador de Programação para Dispositivos Móveis.
