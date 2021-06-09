# Data Lovers

## Índice

- [1. Preâmbulo](#1-preâmbulo)
- [2. Resumo do projeto](#2-resumo-do-projeto)
- [3. Objetivos de aprendizagem](#3-objetivos-de-aprendizagem)
- [4. Considerações gerais](#4-considerações-gerais)
- [5. Critérios mínimos de aceitação do projeto](#5-critérios-mínimos-de-aceitação-do-projeto)
- [6. Hacker edition](#6-hacker-edition)
- [7. Considerações técnicas](#7-considerações-técnicas)
- [8. Guias, dicas e leituras complementares](#8-guias-dicas-e-leituras-complementares)
- [9. Checklist](#9-checklist)

---

## 1. Preâmbulo

Segundo a [Forbes](https://www.forbes.com/sites/bernardmarr/2018/05/21/how-much-data-do-we-create-every-day-the-mind-blowing-stats-everyone-should-read) 90% dos dados que existem hoje foram gerados durante os últimos dois anos. A cada dia geramos 2.5 milhões de terabytes de dados, uma cifra sem precedentes.

Apesar disso, os dados por si só são de pouca utilidade. Para que essas grandes quantidades de dados se convertam em **informação** compreensível para os usuários, precisamos entender e processar estes dados. Uma forma simples de fazer isso é criando _interfaces_ e _visualizações_.

Na imagem seguinte, você pode ver como os dados que estão na parte esquerda podem ser usados para construir a interface amigável e compreensível que está na parte direita.

![json-interface](https://lh4.googleusercontent.com/Tn-RPXS26pVvOTdUzRT1KVaJ-_QbFs9SpcGLxSPE43fgbHaXtFgMUInuDt7kV41DkT1j8Tt29V0LxQW7SMtC6digOIhfTXSBKdwI08wUwhD3RAqlwy0hjfmhZ2BFe91mtmCSEqysfgk)

## 2. Resumo do projeto

Neste projeto você **construirá uma _página web_ para visualizar um _conjunto (set) de dados_** que se adeque às necessidades de seu usuário.

Como entregável final, terá uma página web que permita **visualizar dados, filtrá-los, ordená-los e fazer algum cálculo agregado**. Por cálculo agregado, nos referimos aos diversos cálculos que podem ser feitos com os dados para mostrar a informação mais relevante para os usuários (médias, valores máximos e mínimos, etc).

Para este projeto trazemos uma série de dados de _temáticas diferentes_ para que você explore e decida com qual delas deseja trabalhar. Escolhemos especificamente estes conjuntos de dados porque cremos que se adequem bem a esta etapa de sua aprendizagem.

Uma vez que você defina sua área de interesse, busque entender quem é seu usuário e o que exatamente ele necessita saber ou ver, para que assim possa construir a interface que o ajude a interagir e entender melhor os dados.

Este são os dados que propomos:

- [Pokémon](src/data/pokemon/pokemon.json): Neste conjunto você encontrará uma lista com os 251 Pokémons da região de Kanto e Johto, com suas respectivas estatísticas utilizadas no jogo [Pokémon GO](http://pokemongolive.com).

  - [Pesquisa com jogadores de Pokémon Go](src/data/pokemon/README.md)

- [League of Legends - Challenger leaderboard](src/data/lol/lol.json): Este conjunto mostra a lista de jogadores de uma liga do jogo League of Legends (LoL).

  - [Pesquisa com jogadores de LoL](src/data/lol/README.md)

- [Rick and Morty](src/data/rickandmorty/rickandmorty.json). Lista de personagens da série Rick & Morty. Você pode revisar a documentação da API neste [link](https://rickandmortyapi.com).
  - [Pesquisa com seguidores de Rick and Morty](src/data/rickandmorty/README.md)

* [Jogos Olímpicos do Rio de Janeiro](src/data/athletes/athletes.json).
  Este conjunto nos fornece a lista de atletas que conquistaram medalhas nas
  Olimpíadas do Rio de Janeiro.

  - [Pesquisa com stakeholders dos Jogos Olímpicos do Rio de Janeiro](src/data/athletes/README.md)

* [Studio Ghibli](src/data/ghibli/ghibli.json).
  Lista de animações e personagens do [Studio Ghibli](https://ghiblicollection.com/).
  - [Pesquisa com seguidores de Studio Ghibli](src/data/ghibli/README.md)

## 3. Objetivos de aprendizagem

O objetivo principal deste projeto é que aprenda a desenhar e construir uma interface web onde se possa visualizar e manipular dados, entendendo o que o usuário necessita.

Em outras palavras, você aprenderá a:

### HTML e CSS

- [ ] [Uso de HTML semântico.](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#Semantics_in_HTML)
- [ ] Uso de seletores de CSS.
- [ ] Construir sua aplicação respeitando o desenho realizado (protótipo).
- [ ] [Uso de flexbox em CSS.](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

### DOM e Web APIs

- [ ] Uso de seletores de DOM.
- [ ] Gerenciamento de eventos de DOM.
- [ ] [Manipulação dinâmica de DOM.](https://developer.mozilla.org/pt-BR/docs/DOM/Referencia_do_DOM/Introdu%C3%A7%C3%A3o) (appendChild |createElement | createTextNode| innerHTML | textContent | etc.)

### JavaScript

- [ ] Uso de condicionais (if-else | switch | operador ternário)
- [ ] Uso de laços (for | for..in | for..of | while)
- [ ] Uso de funções (parâmetros | argumentos | valor de retorno)
- [ ] Manipular arrays (filter | map | sort | reduce)
- [ ] Manipular objects (key | value)
- [ ] Uso ES modules ([`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) | [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export))
- [ ] Diferenciar entre expression e statements.
- [ ] Diferenciar entre tipos de dados atômicos e estruturados.

### Testing

- [ ] [Teste unitário.](https://jestjs.io/docs/pt-BR/getting-started)

### Estrutura do código e guia de estilo

- [ ] Organizar e dividir o código em módulos (Modularização)
- [ ] Uso de identificadores descritivos (Nomenclatura | Semântica)
- [ ] Uso de linter (ESLINT)

### Git e GitHub

- [ ] Uso de comandos de git (add | commit | pull | status | push)
- [ ] Gerenciar repositórios de GitHub (clone | fork | gh-pages)
- [ ] Colaboração no Github (branches | pull requests | |tags)

## 4. Considerações gerais

- Este projeto será executado em duplas.
- Este projeto será entregue através do GitHub e a interface deve ser publicada
  no [GitHub Pages](https://pages.github.com/).

## 5. Critérios mínimos de aceitação do projeto

Os critérios considerados para que tenha terminado este projeto são:

### Definição de produto

Documente brevemente seu trabalho no arquivo `README.md` de seu repositório, contando como foi o processo de desenho e como você acredita que o produto possa resolver o problema (ou problemas) de seu usuário.

### Histórias de usuário

Uma vez que entenda a necessidade dos usuários, escreva as [Histórias de Usuário](https://pt.wikipedia.org/wiki/Hist%C3%B3ria_de_usu%C3%A1rio) que representem tudo que o usuário precisa fazer/ver. As **histórias de usuário** devem ser o resultado de seu processo de investigação/pesquisa de seus usuários.

Não esqueça de incluir a definição de pronto (_definition of done_) e os critérios de aceitação para cada uma.

Na medida do possível, termine uma história de usuário antes de passar para a seguinte (cumpra com as definições de pronto + critérios de aceitação).

### Desenho de interface do usuário

#### Protótipo de baixa fidelidade

Durante seu trabalho você deverá fazer e iterar rascunhos de sua solução usando lápis e papel. Recomendamos que fotografe todas as iterações que fizer, suba para seu repositório e as mencione no `README.md`.

#### Testes de usabilidade

Durante o desafio você deverá fazer testes de usabilidade com usuários diferentes, e com base nos resultados desses testes, iterar seus desenhos de interface. Conte-nos quais problemas de usabilidade você detectou através dos testes e como os resolveu na proposta final.

### Implementação da interface de usuário (HTML/CSS/JS)

Após desenhar sua interface de usuário, deverá trabalhar na sua implementação. **Não** é necessário que construa a interface exatamente da mesma forma que desenhou. Terá um tempo limitado para trabalhar no projeto, então você deve priorizar as tarefas.

No mínimo, sua implementação deverá:

1. Mostrar os dados em uma interface: pode ser em cards, tabelas, listas, etc.
2. Permitir ao usuário interagir com a interface para obter as informações que necessita;
3. Ser _responsiva_, ou seja, deve ser visualizada sem problemas a partir de diversos tamanhos de tela: celulares, tablets, notebooks, etc.

### Testes unitários

O _boilerplate_ do projeto não inclui testes unitários. Assim, você terá que escrever seus próprios testes para as funções encarregadas de _processar_, _filtrar_ e _ordenar_ os dados, assim como _calcular_ estatísticas.

Seus testes unitários devem ter cobertura mínima de 70% de _statements_ (_sentenças_), _functions_ (_funções_), _lines_ (_linhas_), e _branches_ (_ramos_) do arquivo `src/data.js`, que irá conter suas funções e que está detalhado na seção de [Considerações técnicas](#srcdatajs).

## 6. Hacker edition

As seções chamadas _Hacker Edition_ são **opcionais**. Se já tiver terminado todos os requisitos anteriores e tiver tempo, pode tentar completá-las. Dessa forma, você pode aprofundar e/ou exercitar mais os objetivos de aprendizagem deste projeto.

Features/características extra sugeridas:

- Ao invés de consumir dados estáticos do repositório, pode fazer isso de forma dinâmica, carregando um arquivo JSON com `fetch`. A pasta `src/data` contém uma versão `.js` e uma `.json` de cada conjunto de dados.
- Adicione à sua interface visualização de dados em forma de gráficos. Para isso, recomendamos explorar bibliotecas de gráficos como [Chart.js](https://www.chartjs.org/) ou [Google Charts](https://developers.google.com/chart/).
- 100% de cobertura nos testes.

## 7. Considerações técnicas

A lógica do projeto deve estar implementada somente em JavaScript (ES6), HTML e CSS. Neste projeto não está permitido o uso de bibliotecas e frameworks, apenas [vanilla JavaScript](https://medium.com/laboratoria-how-to/vanillajs-vs-jquery-31e623bbd46e), com exceção das bibliotecas para gráficos (ver [_Parte opcional_](#6-hacker-edition) acima).

Não se deve utilizar a _pseudo-variável_ `this`.

O _boilerplate_ contém uma estrutura de arquivos como ponto de partida, assim como toda a configuração de dependências:

```text
.
├── EXTRA.md
├── README.md
├── package.json
├── src
|  ├── data (de acordo com o data que forem trabalhar)
|  |  ├── lol
|  |  |  ├── lol.js
|  |  |  ├── lol.json
|  |  |  └── README.md
|  |  ├── pokemon
|  |  |  ├── pokemon.js
|  |  |  ├── pokemon.json
|  |  |  └── README.md
|  |  └── rickandmorty
|  |     ├── rickandmorty.js
|  |     └── rickandmorty.json
|  |     └── README.md
|  ├── data.js
|  ├── index.html
|  ├── main.js
|  └── style.css
└── test
   └── data.spec.js

directory: 6 file: 17
```

### `src/index.html`

Como no projeto anterior, existe um arquivo `index.html`. Como já sabe, aqui entra a página que vai ser exibida ao usuário. Também serve para indicar quais scripts serão utilizados e juntar tudo o que foi feito.

### `src/main.js`

Recomendamos que utilize `src/main.js` para todos os códigos que tenham a ver com a exibição dos dados na tela. Com isto nos referimos basicamente à interação com o DOM. Operações como criação de nós, registro de manejadores de eventos (_event listeners_ ou _event handlers_) e etc.

Esta não é a única forma de dividir seu código. Pode utilizar mais arquivos e pastas, sempre e quando a estrutura estiver clara para suas colegas.

Neste arquivo você encontrará uma séris de _imports comentados_. Para carregar diferentes fontes de dados, você deverá "descomentar" estos _imports_. Cada um destes _imports_ criará uma variável `data` com os dados correspondentes à fonte escolhida.

Por exemplo, se "descomentamos" a seguinte linha:

```js
// import data from './data/pokemon/pokemon.js';
```

A linha ficaria assim:

```js
import data from './data/pokemon/pokemon.js';
```

E agora teríamos a variável `data` disponível em `src/main.js`.

### `src/data.js`

O coração deste projeto é a manipulação de dados através de arrays e objetos.

Recomendamos que este arquivo contenha toda a funcionalidade que corresponda a obter, processar e manipular dados (suas funções):

- `filterData(data, condition)`: esta função receberia os dados e nos retornaria os que cumprem com a condição.

- `sortData(data, sortBy, sortOrder)`: esta função recebe três parâmetros. O primeiro, `data`, nos entrega os dados. O segundo, `sortBy`, diz respeito a qual das informações quer usar para ordenar. O terceiro, `sortOrder`, indica se quer ordenar de maneira crescente ou decrescente.

- `computeStats(data)`: essa função nos permite fazer cálculos estatísticos básicos para serem exibidos de acordo com o que os dados permitem.

Estes nomes de funções e parâmetros são somente referência, o que vocês decidir utilizar vai depender da sua implementação.

Estas funções devem ser [_puras_](https://imasters.com.br/desenvolvimento/serie-js-e-vida-pure-functions-funcoes-puras) e independentes do DOM. Estas funções serão depois usadas a partir do arquivo `src/main.js`, ao carregar a página e a cada vez que o usuário interagir com a interface (cliques, seleções, filtros, ordenação, etc).

### `src/data`

Nesta pasta estão os dados de diferentes fontes. Você vai encontrar uma pasta para cada fonte, e dentro de cada pasta estão dois arquivos: um com a extensão `.js` e outro `.json`. Ambos os arquivos contém os mesmos dados; a diferença é que podemos usar o `.js` com uma tag `<script>`, enquanto o `.json` servirá para, opcionalmente, ser carregado de forma assíncrona com [`fetch()`](https://developer.mozilla.org/pt-br/docs/Web/API/Fetch_API) (ver seção da [_Parte Opcional_](#6-hacker-edition)).

### `test/data.spec.js`

Você também deverá fazer os teste unitários das funções implementadas no arquivo `data.js`.

---

## 8. Guias, dicas e leituras complementares

### Primeiros passos

Antes de começar a escrever o código, você deve definir seu produto com base no conhecimento que puder obter a respeito de seus usuários. Estas perguntas podem ajudar:

- Quem são os usuários principais do produto?
- Quais são os objetivos dos usuários com relação ao produto?
- Quais são os dados mais relevantes que querem ver na interface e por quê?
- Quando utilizam ou utilizariam o produto?
- Toda sua investigação prévia deve ter como resultado as histórias de usuário de seu projeto.
- Não faça os protótipos de alta fidelidade de todas as suas histórias. Comece somente pela que necessite para seu Sprint 1.

Quando estiver pronta para codar, sugerimos começar desta forma:

1. Uma das integrantes da dupla deve fazer um 🍴 [fork](https://docs.github.com/pt/github/getting-started-with-github/quickstart/fork-a-repo) do repositório de sua turma (a equipe de formação fornecer o link) e irá adicionar a outra integrante da dupla como [colaboradora do repositório](https://docs.github.com/pt/github/setting-up-and-managing-your-github-user-account/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository).

2. Ambas farão o ⬇️ [clone](https://docs.github.com/pt/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository) do repositório _forkado_ para seu computador (cópia local).

3. Instale as dependências do projeto com o comando `npm install`, assumindo que já tenha instalado o [Node.js](https://nodejs.org/) (que inclui [npm](https://docs.npmjs.com/)).

4. Se tudo correr bem, deve ser capaz de executar os :traffic_light: testes unitários (unit tests) com o comando `npm test`.

5. Para ver a interface de seu programa no navegador, utilize o comando `npm start` para subir o servidor web no endereço `http://localhost:5000`.

6. Comece a codar! 🚀

---

### Conteúdo de referência

#### UX Design (Experiência do usuário)

- Pesquisa com usuários / entrevistas
- Princípios de design/UI

#### Desenvolvimento Front-End

- Unidade de testes do curso de JavaScript do LMS.
- Unidade de arrays do curso de JavaScript do LMS.
- Unidade de objetos do curso de JavaScript do LMS.
- Unidade de funções do curso de JavaScript do LMS.
- Unidade de DOM do curso de JavaScript do LMS.
- [Array no MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Array.sort no MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [Array.map no MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Array.filter no MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/filtro)
- [Array.reduce no MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
- [Array.forEach no MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
- [Object.keys no MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
- [Object.entries no MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
- [Fetch API no MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [json.org](https://json.org/json-pt.html)
- [expressions-vs-statements](https://2ality.com/2012/09/expressions-vs-statements.html)
- [Tipos de Dados](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Data_structures)
- [Módulos: Export](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/export)
- [Módulos: Import](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/import)

#### Ferramentas

- [Git](https://git-scm.com/)
- [GitHub](https://github.com/)
- [GitHub Pages](https://pages.github.com/)
- [Node.js](https://nodejs.org/)
- [Jest](https://jestjs.io/)

#### Organização do trabalho

- [Histórias de Usuário](https://www.youtube.com/watch?v=sEtiCJfXTE8)
- [Definição de pronto](https://www.youtube.com/watch?v=Kfss63Q42F8)
- [Critérios de aceitação](https://medium.com/@karladiasn/user-stories-e-crit%C3%A9rios-de-aceita%C3%A7%C3%A3o-317c48403fcd)
- [Guia para Data Lovers](https://docs.google.com/presentation/d/1bOq8ns5wsvXdksdqYL3aQoxzFQsXTVlyvlV-yxI2oBM/present?token=AC4w5VhHBbEEA9u2w8bm3Ey1Cse349frbg%3A1567540902700&includes_info_params=1&eisi=CM_ytPW4teQCFQrJgQodeTcEZg#slide=id.g5282e1a53f_1_106)

---

## 9. Checklist

- [ ] Usar VanillaJS.
- [ ] Não utilizar `this`.
- [ ] Passa pelo linter (`npm run pretest`)
- [ ] Passa pelos testes (`npm test`)
- [ ] Testes unitários cobrem um mínimo de 70% de statements, functions, lines e branches.
- [ ] Inclui uma _definição de produto_ clara e informativa no `README.md`.
- [ ] Inclui histórias de usuário no `README.md`.
- [ ] Inclui rascunho da solução (protótipo de baixa fidelidade) no `README.md`.
- [ ] Inclui uma lista de problemas detectados nos testes de usabilidade no `README.md`.
- [ ] UI: Mostra lista/tabela/etc com dados e/ou indicadores.
- [ ] UI: Permite ordenar dados por um ou mais campos (asc e desc).
- [ ] UI: Permite filtrar dados com base em uma condição.
- [ ] UI: É _responsivo_.
