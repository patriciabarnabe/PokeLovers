
//SEÇÃO 1: IMPORTAÇÃO DAS FUNÇÕES
import functions from './data.js';

//SEÇÃO 2: IMPORTAÇÃO DO .JSON
const getPokemonData = await fetch("data/pokemon/pokemon.json");
const pokemonData = await getPokemonData.json();
const pokemon = pokemonData.pokemon

const order = document.getElementById("order")
const option = document.getElementById("option")
const orderButton = document.getElementById("order-button")

//SEÇÃO 3: MANIPULAÇÃO/ALTERAÇÃO dos atributos

// Alteração do sexo dos Pokemons. Fêmea (para female) e Macho (para male):
pokemon[28].name = "Nidoran (Fêmea)"
pokemon[31].name = "Nidoran (Macho)"

// Alteração da coluna "generation" para aparecer somente o número da geração:
for (let i=0; i < pokemon.length; i++) {
  if (pokemon[i].generation.num === "generation i") {
    pokemon[i].generation.num = "I"
  } else {
    pokemon[i].generation.num = "II"
  }
}

// Primeira letra do nome do Pokemon em maiúsculo:
for (let i=0; i < pokemon.length; i++) {
  pokemon[i].name = pokemon[i].name.charAt(0).toUpperCase() + pokemon[i].name.substr(1)
}

// Primeira letra do nome da geração do Pokemon em maiúsculo:
for (let i=0; i < pokemon.length; i++) {
  pokemon[i].generation.name = pokemon[i].generation.name.charAt(0).toUpperCase() + pokemon[i].generation.name.substr(1)
}

// Primeira letra do tipo do Pokemon em maiúsculo:
for (let i=0; i < pokemon.length; i++) {
  for (let j=0; j <pokemon[i].type.length; j++)
    pokemon[i].type[j] = pokemon[i].type[j].charAt(0).toUpperCase() + pokemon[i].type[j].substr(1)
}

//Transformando o valor da propriedade egg: 
for (let i=0; i < pokemon.length; i++) {

  if(pokemon[i].egg === "not in eggs"){
    pokemon[i].egg = "Não possui ovos"
  } else if (pokemon[i].egg === "2 km"){
    pokemon[i].egg = "02 km"
  } else if (pokemon[i].egg === "5 km"){
    pokemon[i].egg = "05 km"
  } else if (pokemon[i].egg === "7 km"){
    pokemon[i].egg = "07 km"
  } 
}

// Transformando undefined de tipo em vazio:
for (let i=0; i<pokemon.length; i++) {
  if(pokemon[i].type.length === 1) {
    pokemon[i].type[1] = ""
  }
}

// Transformar variável "spawn-chance" em número:
/*for (let i=0; i<pokemon.length; i++) {
  let po = ""
  po = pokemon[i]["stats"]["base-attack"] = parseInt(pokemon[i]["stats"]["base-attack"], 10)
  console.log(po)
}*/

//Criação de listas de pokemons
function listPokemons (dataset) {
    const listOfPokemons = dataset.reduce((accumulator, dataset) => {
      accumulator += `
      <li class="lista-de-pokemons"> 
        <img class="imagem-do-pokemon" alt="${dataset.name}" src="${dataset.img}">
        <p  class="id-do-pokemon">#${dataset["num"]} </p> 
        <a  class="nome-do-pokemon"> ${dataset["name"]} </a> 
      </li>`
      return accumulator
    },[])
    
    const printList= document.getElementById("lista-impressa")
    printList .innerHTML = listOfPokemons
    
  }


  
//listPokemons(pokemon)




// SEÇÃO: ORDENAÇÃO POR RARIDADE, NOME e DISTÂNCIA DOS OVOS
  //Chamando função de ordenar
  orderButton.addEventListener("click", (event) => {
    event.preventDefault()

    const sortedData =  functions.sortData (pokemon, order.value, option.value)
    listPokemons(sortedData)
  })


//SEÇÃO : FILTRO PELO TECLADO (KEYUP) 
let filterInput = document.getElementById("filterInput");
filterInput.addEventListener("keyup", filterNames);

function filterNames() {
  let filterValue = document.getElementById("filterInput").value.toUpperCase();
  let ul = document.getElementById("lista-impressa");
  let li = ul.getElementsByClassName("lista-de-pokemons");

  for (let i=0; i<li.length; i++){
    let a = li[i].getElementsByClassName("nome-do-pokemon")[0];
    if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      li[i].style.display="";
    } else {
      li[i].style.display="none";
    }
  }
}


// SEÇÃO: FILTRAGEM DA GERAÇÃO DO POKEMON (NÚMERO E NOME)

//1. Criação de listas de pokemons:
function listPokemonsByGeneration (dataset) {
  const listOfPokemons = dataset.reduce((accumulator, dataset) => {
    accumulator += `
    <li class="lista-de-pokemons"> 
      <img class="imagem-do-pokemon" alt="${dataset.name}" src="${dataset.img}">
      <p  class="id-do-pokemon">#${dataset["num"]} </p> 
      <a  class="nome-do-pokemon"> ${dataset["name"]} </a> 
      <p  class="geração-do-pokemon"> Geração ${dataset["generation"]["num"]} </p>
      <p  class="geração-do-pokemon"> ${dataset["generation"]["name"]} </p>
    </li>`
    return accumulator
  },[])
  
  const printList= document.getElementById("lista-impressa")
  printList .innerHTML = listOfPokemons
  
}

//2. Impressão da lista de pokemon completa:
listPokemons(pokemon)

//3. Manipulação do DOM
let functionGenerationResult = "";
let generationButton = "";

//3.a) Criação da função geral dos botões (primeira e segunda geração):
function generationButtonsFunction (generationInput) {
document.getElementById(generationInput).addEventListener("click", function (event) {
    event.preventDefault()
    generationButton = event.target.value;
    functionGenerationResult = functions.filterData(pokemon, ["generation"],["num"], generationButton);
    listPokemonsByGeneration(functionGenerationResult)
    filterNames()
  })
}
  
//3.b) Criação de um array com o nome dos botões:
const pokemonGenerations = ["first-generation-button","second-generation-button"] 

//3.c) Aplicação da função geral do botão para cada elemento da array(cada nome de botão)
pokemonGenerations.map(generationButtonsFunction)

//4. Função para printar TODAS as gerações.
document.getElementById("all-generations-button").addEventListener("click", function (event) {
    event.preventDefault()
    listPokemonsByGeneration(pokemon)
    filterNames()
  })

// SEÇÃO: FILTRAGEM DO TIPO:
//1. Criação de listas de pokemons:
function listPokemonsByType (dataset) {
  const listOfPokemons = dataset.reduce((accumulator, dataset) => {
    accumulator += `
    <li class="lista-de-pokemons"> 
      <img class="imagem-do-pokemon" alt="${dataset.name}" src="${dataset.img}">
      <p  class="id-do-pokemon">#${dataset["num"]} </p> 
      <a  class="nome-do-pokemon"> ${dataset["name"]} </a> 
      <p  class="nome-do-pokemon"> ${dataset["type"][0]} </p> 
      <p  class="nome-do-pokemon"> ${dataset["type"][1]} </p> 
    </li>`
    return accumulator
  },[])
  
  const printList= document.getElementById("lista-impressa")
  printList .innerHTML = listOfPokemons
  
}

//2. Impressão da lista de pokemons completa:
listPokemonsByType(pokemon)

//3. Manipulação do DOM
let functionTypeResult1 = "";
let functionTypeResult2 = "";
let functionTypeResultMerged = "";
let typeButton = "";

//3.a) Criação da função geral dos botões:
function typeButtonsFunction (typeInput) {
  document.getElementById(typeInput).addEventListener("click", function (event) {
    event.preventDefault()
    typeButton = event.target.value;
    functionTypeResult1 = functions.filterData(pokemon, ["type"],[0], typeButton);
    functionTypeResult2 = functions.filterData(pokemon, ["type"],[1], typeButton);
    functionTypeResultMerged = Object.assign(functionTypeResult1, functionTypeResult2)
    listPokemonsByType(functionTypeResultMerged)
    filterNames()
  })
}

//3.b) Criação de um array com o nome dos botões:
let pokemonTypes = ["bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost",
"grass", "ground","ice", "normal", "poison", "psychic", "rock", "water", "steel"]

//3.b.I) Adição do sufixo "-type-button"
for (let i=0; i<pokemonTypes.length; i++) {
  pokemonTypes[i] = pokemonTypes[i] + "-type-button"
}

//3.c) Aplicação da função geral do botão para cada elemento da array(cada nome de botão)
pokemonTypes.map(typeButtonsFunction)

// let average = pokemon.reduce((a,c) =>  a+c["stats"]["base-attack"]/251,0)
// console.log(average)
// console.log(pokemon)

//console.log(functions.computeStats(pokemon, "stats", "base-attack"))

console.log(pokemon)