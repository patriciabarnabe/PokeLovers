
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

//Primeira letra da resistência do Pokemom em maiusculo:
for (let i=0; i < pokemon.length; i++) {
  for (let j=0; j <pokemon[i].resistant.length; j++)
    pokemon[i].resistant[j] = pokemon[i].resistant[j].charAt(0).toUpperCase() + pokemon[i].resistant[j].substr(1)
}


//Primeira letra da fraqueza do Pokemom em maiusculo:
for (let i=0; i < pokemon.length; i++) {
  for (let j=0; j <pokemon[i].weaknesses.length; j++)
    pokemon[i].weaknesses[j] = pokemon[i].weaknesses[j].charAt(0).toUpperCase() + pokemon[i].weaknesses[j].substr(1)
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

//Primeira letra da raridade do Pokemon em maiúsculo:
for (let i=0; i < pokemon.length; i++) {
  pokemon[i]["pokemon-rarity"] = pokemon[i]["pokemon-rarity"].charAt(0).toUpperCase() + pokemon[i]["pokemon-rarity"].substr(1)
}

//Transformar raridade em português:
for (let i=0; i < pokemon.length; i++) {
  switch (pokemon[i]["pokemon-rarity"]) {
    case "Legendary":
      pokemon[i]["pokemon-rarity"] = "Lendário" 
      break
    case "Mythic":
      pokemon[i]["pokemon-rarity"] = "Mítico" 
      break
  }
}

// Transformando undefined de tipo em vazio:
for (let i=0; i<pokemon.length; i++) {
  if(pokemon[i].type.length === 1) {
    pokemon[i].type[1] = ""
  }
}

// Transformando undefined de resistência em vazio:
for (let i=0; i < pokemon.length; i++) {
  switch(pokemon[i].resistant.length) {
    case 1 :
      pokemon[i].resistant[1] = ""
      pokemon[i].resistant[2] = ""
      pokemon[i].resistant[3] = ""
      pokemon[i].resistant[4] = ""
      pokemon[i].resistant[5] = ""
      pokemon[i].resistant[6] = ""
      break
    case 2:
      pokemon[i].resistant[2] = ""
      pokemon[i].resistant[3] = ""
      pokemon[i].resistant[4] = ""
      pokemon[i].resistant[5] = ""
      pokemon[i].resistant[6] = ""
      break
    case 3:
      pokemon[i].resistant[3] = ""
      pokemon[i].resistant[4] = ""
      pokemon[i].resistant[5] = ""
      pokemon[i].resistant[6] = ""
      break  
    case 4:
      pokemon[i].resistant[4] = ""
      pokemon[i].resistant[5] = ""
      pokemon[i].resistant[6] = ""
      break  
    case 5:
      pokemon[i].resistant[5] = ""
      pokemon[i].resistant[6] = ""
      break  
    case 6:
      pokemon[i].resistant[6] = ""
      break  
  }
}

// Transformando undefined de fraqueza em vazio:
for (let i=0; i < pokemon.length; i++) {
  switch(pokemon[i].weaknesses.length) {
    case 1 :
      pokemon[i].weaknesses[1] = ""
      pokemon[i].weaknesses[2] = ""
      pokemon[i].weaknesses[3] = ""
      pokemon[i].weaknesses[4] = ""
      pokemon[i].weaknesses[5] = ""
      pokemon[i].weaknesses[6] = ""
      break
    case 2:
      pokemon[i].weaknesses[2] = ""
      pokemon[i].weaknesses[3] = ""
      pokemon[i].weaknesses[4] = ""
      pokemon[i].weaknesses[5] = ""
      pokemon[i].weaknesses[6] = ""
      break
    case 3:
      pokemon[i].weaknesses[3] = ""
      pokemon[i].weaknesses[4] = ""
      pokemon[i].weaknesses[5] = ""
      pokemon[i].weaknesses[6] = ""
      break  
    case 4:
      pokemon[i].weaknesses[4] = ""
      pokemon[i].weaknesses[5] = ""
      pokemon[i].weaknesses[6] = ""
      break  
    case 5:
      pokemon[i].weaknesses[5] = ""
      pokemon[i].weaknesses[6] = ""
      break  
    case 6:
      pokemon[i].weaknesses[6] = ""
      break  
  }
}

// Criar segunda coluna de objectos para pegar a imagem (alguns ids começam com 0):
for (let i=0; i<pokemon.length; i++) {
pokemon[i].num2 = i + 1
}

// Criar segunda coluna de tipo para transformar os tipos em português:
for (let i=0; i < pokemon.length; i++) {
  pokemon[i].type2 = [];
  switch (pokemon[i].type[0]) {
    case "Bug":
      pokemon[i].type2[0] = "Inseto"
      break
    case "Dark":
      pokemon[i].type2[0] = "Sombrio" 
      break
    case "Dragon":
      pokemon[i].type2[0] = "Dragão" 
      break
    case "Electric":
      pokemon[i].type2[0] = "Elétrico"
      break  
    case "Fairy":
      pokemon[i].type2[0] = "Fada"  
      break
    case "Fighting":
      pokemon[i].type2[0] = "Lutador"  
      break
    case "Fire":
      pokemon[i].type2[0] = "Fogo"  
      break
    case "Flying":
      pokemon[i].type2[0] = "Voador"  
      break
    case "Ghost":
      pokemon[i].type2[0] = "Fantasma" 
      break 
    case "Grass":
      pokemon[i].type2[0] = "Planta"
      break
    case "Ground":
      pokemon[i].type2[0] = "Terrestre"
      break
    case "Ice":
      pokemon[i].type2[0] = "Gelo"
      break
    case "Normal":
      pokemon[i].type2[0] = "Normal"
      break
    case "Poison":
      pokemon[i].type2[0] = "Venenoso"
      break
    case "Psychic":
      pokemon[i].type2[0] = "Psíquico"
      break
    case "Rock":
      pokemon[i].type2[0] = "Pedra"
      break
    case "Steel":
      pokemon[i].type2[0] = "Aço"
      break
    case "Water":
      pokemon[i].type2[0] = "Água"
      break
    default:
      pokemon[i].type2[0] = ""
      break
  }
  switch (pokemon[i].type[1]) {
    case "Bug":
      pokemon[i].type2[1] = "Inseto"
      break
    case "Dark":
      pokemon[i].type2[1] = "Sombrio" 
      break
    case "Dragon":
      pokemon[i].type2[1] = "Dragão" 
      break
    case "Electric":
      pokemon[i].type2[1] = "Elétrico"
      break  
    case "Fairy":
      pokemon[i].type2[1] = "Fada"  
      break
    case "Fighting":
      pokemon[i].type2[1] = "Lutador"  
      break
    case "Fire":
      pokemon[i].type2[1] = "Fogo"  
      break
    case "Flying":
      pokemon[i].type2[1] = "Voador"  
      break
    case "Ghost":
      pokemon[i].type2[1] = "Fantasma" 
      break 
    case "Grass":
      pokemon[i].type2[1] = "Planta"
      break
    case "Ground":
      pokemon[i].type2[1] = "Terrestre"
      break
    case "Ice":
      pokemon[i].type2[1] = "Gelo"
      break
    case "Normal":
      pokemon[i].type2[1] = "Normal"
      break
    case "Poison":
      pokemon[i].type2[1] = "Venenoso"
      break
    case "Psychic":
      pokemon[i].type2[1] = "Psíquico"
      break
    case "Rock":
      pokemon[i].type2[1] = "Pedra"
      break
    case "Steel":
      pokemon[i].type2[1] = "Aço"
      break
    case "Water":
      pokemon[i].type2[1] = "Água"
      break
    default:
      pokemon[i].type2[1] = ""
      break
  }
}


// Criar segunda coluna de resistencia para transformar em apenas 2 letras:
for (let i=0; i < pokemon.length; i++) {
  pokemon[i].resistant2 = [];
  for (let j =0; j <pokemon[i].resistant.length; j++) {
    switch (pokemon[i].resistant[j]) {
    case "Bug":
      pokemon[i].resistant2[j] = "IN"
      break
    case "Dark":
      pokemon[i].resistant2[j] = "SO" 
      break
    case "Dragon":
      pokemon[i].resistant2[j] = "DG" 
      break
    case "Electric":
      pokemon[i].resistant2[j] = "EL"
      break  
    case "Fairy":
      pokemon[i].resistant2[j] = "FA"  
      break
    case "Fighting":
      pokemon[i].resistant2[j] = "LU"  
      break
    case "Fire":
      pokemon[i].resistant2[j] = "FO"  
      break
    case "Flying":
      pokemon[i].resistant2[j] = "VO"  
      break
    case "Ghost":
      pokemon[i].resistant2[j] = "FT" 
      break 
    case "Grass":
      pokemon[i].resistant2[j] = "PL"
      break
    case "Ground":
      pokemon[i].resistant2[j] = "TE"
      break
    case "Ice":
      pokemon[i].resistant2[j] = "GE"
      break
    case "Normal":
      pokemon[i].resistant2[j] = "NO"
      break
    case "Poison":
      pokemon[i].resistant2[j] = "VE"
      break
    case "Psychic":
      pokemon[i].resistant2[j] = "PS"
      break
    case "Rock":
      pokemon[i].resistant2[j] = "PE"
      break
    case "Steel":
      pokemon[i].resistant2[j] = "AÇ"
      break
    case "Water":
      pokemon[i].resistant2[j] = "ÁG"
      break
    default:
      pokemon[i].resistant2[j] = ""
      break
    }
  }
}

// Criar terceira coluna de resistencia para transformar em português:
for (let i=0; i < pokemon.length; i++) {
  pokemon[i].resistant3 = [];
  for (let j =0; j <pokemon[i].resistant.length; j++) {
    switch (pokemon[i].resistant[j]) {
    case "Bug":
      pokemon[i].resistant3[j] = "Inseto"
      break
    case "Dark":
      pokemon[i].resistant3[j] = "Sombrio" 
      break
    case "Dragon":
      pokemon[i].resistant3[j] = "Dragão" 
      break
    case "Electric":
      pokemon[i].resistant3[j] = "Elétrico"
      break  
    case "Fairy":
      pokemon[i].resistant3[j] = "Fada"  
      break
    case "Fighting":
      pokemon[i].resistant3[j] = "Lutador"  
      break
    case "Fire":
      pokemon[i].resistant3[j] = "Fogo"  
      break
    case "Flying":
      pokemon[i].resistant3[j] = "Voador"  
      break
    case "Ghost":
      pokemon[i].resistant3[j] = "Fantasma" 
      break 
    case "Grass":
      pokemon[i].resistant3[j] = "Planta"
      break
    case "Ground":
      pokemon[i].resistant3[j] = "Terreste"
      break
    case "Ice":
      pokemon[i].resistant3[j] = "Gelo"
      break
    case "Normal":
      pokemon[i].resistant3[j] = "Normal"
      break
    case "Poison":
      pokemon[i].resistant3[j] = "Venenoso"
      break
    case "Psychic":
      pokemon[i].resistant3[j] = "Psíquico"
      break
    case "Rock":
      pokemon[i].resistant3[j] = "Pedra"
      break
    case "Steel":
      pokemon[i].resistant3[j] = "Aço"
      break
    case "Water":
      pokemon[i].resistant3[j] = "Água"
      break
    default:
      pokemon[i].resistant3[j] = ""
      break
    }
  }
}

// Criar segunda coluna de fraqueza para transformar em apenas 2 letras:
for (let i=0; i < pokemon.length; i++) {
  pokemon[i].weaknesses2 = [];
  for (let j =0; j <pokemon[i].weaknesses.length; j++) {
    switch (pokemon[i].weaknesses[j]) {
    case "Bug":
      pokemon[i].weaknesses2[j] = "IN"
      break
    case "Dark":
      pokemon[i].weaknesses2[j] = "SO" 
      break
    case "Dragon":
      pokemon[i].weaknesses2[j] = "DG" 
      break
    case "Electric":
      pokemon[i].weaknesses2[j] = "EL"
      break  
    case "Fairy":
      pokemon[i].weaknesses2[j] = "FA"  
      break
    case "Fighting":
      pokemon[i].weaknesses2[j] = "LU"  
      break
    case "Fire":
      pokemon[i].weaknesses2[j] = "FO"  
      break
    case "Flying":
      pokemon[i].weaknesses2[j] = "VO"  
      break
    case "Ghost":
      pokemon[i].weaknesses2[j] = "FT" 
      break 
    case "Grass":
      pokemon[i].weaknesses2[j] = "PL"
      break
    case "Ground":
      pokemon[i].weaknesses2[j] = "TE"
      break
    case "Ice":
      pokemon[i].weaknesses2[j] = "GE"
      break
    case "Normal":
      pokemon[i].weaknesses2[j] = "NO"
      break
    case "Poison":
      pokemon[i].weaknesses2[j] = "VE"
      break
    case "Psychic":
      pokemon[i].weaknesses2[j] = "PS"
      break
    case "Rock":
      pokemon[i].weaknesses2[j] = "PE"
      break
    case "Steel":
      pokemon[i].weaknesses2[j] = "AÇ"
      break
    case "Water":
      pokemon[i].weaknesses2[j] = "ÁG"
      break
    default:
      pokemon[i].weaknesses2[j] = ""
      break
    }
  }
}

// Criar terceira coluna de resistencia para transformar em português:
for (let i=0; i < pokemon.length; i++) {
  pokemon[i].weaknesses3 = [];
  for (let j =0; j <pokemon[i].weaknesses.length; j++) {
    switch (pokemon[i].weaknesses[j]) {
    case "Bug":
      pokemon[i].weaknesses3[j] = "Inseto"
      break
    case "Dark":
      pokemon[i].weaknesses3[j] = "Sombrio" 
      break
    case "Dragon":
      pokemon[i].weaknesses3[j] = "Dragão" 
      break
    case "Electric":
      pokemon[i].weaknesses3[j] = "Elétrico"
      break  
    case "Fairy":
      pokemon[i].weaknesses3[j] = "Fada"  
      break
    case "Fighting":
      pokemon[i].weaknesses3[j] = "Lutador"  
      break
    case "Fire":
      pokemon[i].weaknesses3[j] = "Fogo"  
      break
    case "Flying":
      pokemon[i].weaknesses3[j] = "Voador"  
      break
    case "Ghost":
      pokemon[i].weaknesses3[j] = "Fantasma" 
      break 
    case "Grass":
      pokemon[i].weaknesses3[j] = "Planta"
      break
    case "Ground":
      pokemon[i].weaknesses3[j] = "Terreste"
      break
    case "Ice":
      pokemon[i].weaknesses3[j] = "Gelo"
      break
    case "Normal":
      pokemon[i].weaknesses3[j] = "Normal"
      break
    case "Poison":
      pokemon[i].weaknesses3[j] = "Venenoso"
      break
    case "Psychic":
      pokemon[i].weaknesses3[j] = "Psíquico"
      break
    case "Rock":
      pokemon[i].weaknesses3[j] = "Pedra"
      break
    case "Steel":
      pokemon[i].weaknesses3[j] = "Aço"
      break
    case "Water":
      pokemon[i].weaknesses3[j] = "Água"
      break
    default:
      pokemon[i].weaknesses3[j] = ""
      break
    }
  }
}


//Criação de listas de pokemons
function listPokemons (dataset) {
    const listOfPokemons = dataset.reduce((accumulator, dataset) => {
      accumulator += `
      <div class="pokemon-card"> 
        <li class="lista-de-pokemons"> 
          <img class="imagem-do-pokemon" alt="${dataset.name}" src="https://pokeres.bastionbot.org/images/pokemon/${dataset.num2}.png">
          <p class="id-do-pokemon">#${dataset["num"]} </p> 
          <p class="nome-do-pokemon"> ${dataset["name"]} </p> 
          <p class="tipo-do-pokemon" value= ${dataset["type"][0]}> ${dataset["type2"][0]} </p> 
          <p class="tipo-do-pokemon" value= ${dataset["type"][1]}> ${dataset["type2"][1]} </p> 
        </li>
      </div> `
      return accumulator
    },[])
    
    const printList= document.getElementById("lista-impressa")
    printList.innerHTML = listOfPokemons
    
  }

// SEÇÃO: ORDENAÇÃO POR RARIDADE, NOME e DISTÂNCIA DOS OVOS

  //1. Criação de listas de pokemons por raridade
  function listPokemonsByRarity (dataset) {
    const listOfPokemonsByRarity = dataset.reduce((accumulator, dataset) => {
      accumulator += `
      <div class="pokemon-card"> 
        <li class="lista-de-pokemons"> 
          <img class="imagem-do-pokemon" alt="${dataset.name}" src="https://pokeres.bastionbot.org/images/pokemon/${dataset.num2}.png">
          <p class="id-do-pokemon">#${dataset["num"]} </p> 
          <p class="nome-do-pokemon"> ${dataset["name"]} </p> 
          <p class="tipo-do-pokemon" value= ${dataset["type"][0]}> ${dataset["type2"][0]} </p> 
          <p class="tipo-do-pokemon" value= ${dataset["type"][1]}> ${dataset["type2"][1]} </p>
          <p class="raridade-do-pokemon" value= ${dataset["pokemon-rarity"]}>Nível de Raridade: ${dataset["pokemon-rarity"]}</p>  
        </li>
      </div> `
      return accumulator
    },[])
    
    const printList= document.getElementById("lista-impressa")
    printList.innerHTML = listOfPokemonsByRarity
  }

//2. Criação de listas de pokemons por distância de ovos
  function listPokemonsByEgg (dataset) {
      const listOfPokemonsByEgg = dataset.reduce((accumulator, dataset) => {
        accumulator += `
        <div class="pokemon-card"> 
          <li class="lista-de-pokemons"> 
            <img class="imagem-do-pokemon" alt="${dataset.name}" src="https://pokeres.bastionbot.org/images/pokemon/${dataset.num2}.png">
            <p class="id-do-pokemon">#${dataset["num"]} </p> 
            <p class="nome-do-pokemon"> ${dataset["name"]} </p> 
            <p class="tipo-do-pokemon" value= ${dataset["type"][0]}> ${dataset["type2"][0]} </p> 
            <p class="tipo-do-pokemon" value= ${dataset["type"][1]}> ${dataset["type2"][1]} </p>
            <p class="distancia-ovos" value= ${dataset["egg"]}> Distância dos Ovos: ${dataset["egg"]}</p>  
          </li>
        </div> `
        return accumulator
      },[])
      
      const printList= document.getElementById("lista-impressa")
      printList.innerHTML = listOfPokemonsByEgg
    }


  //3.Chamando função de ordenar
  orderButton.addEventListener("click", (event) => {
    event.preventDefault()

    const sortedData =  functions.sortData (pokemon, order.value, option.value)

    if(order.value === "egg") {
      listPokemonsByEgg(sortedData)
    } 
    else if (order.value === "pokemon-rarity") {
      listPokemonsByRarity(sortedData)
    }
    else {
      listPokemons(sortedData)
    }

  })

//SEÇÃO : FILTRO PELO TECLADO (KEYUP) 
const filterInput = document.getElementById("pokemon-search");
filterInput.addEventListener("keyup", filterNames);

function filterNames() {
  const filterValue = document.getElementById("pokemon-search").value.toUpperCase();
  const pokemonPrintedList = document.getElementById("lista-impressa");
  const pokemonList = pokemonPrintedList.getElementsByClassName("lista-de-pokemons");
  const pokemonCard = document.getElementsByClassName("pokemon-card");

  for (let i=0; i<pokemonList.length; i++){
    let filteredPokemonCard = pokemonList[i].getElementsByClassName("nome-do-pokemon")[0];
    if (filteredPokemonCard.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      pokemonList[i].style.display="";
      pokemonCard[i].style.display="";
    } else {
      pokemonList[i].style.display="none";
      pokemonCard[i].style.display="none";
    }
  }
}


// HIDE ADVANCED SEARCH
function showAndHideFilters (section) {
  const divSection = document.getElementById(section) 
  if (divSection.style.display === "none") {
    divSection.style.display="block"
  } else {
    divSection.style.display="none"
  }
}
function hideOtherFilterDivs (showingDiv, hidingDiv) {
  const divSectionShowed = document.getElementById(showingDiv) 
  const divSectionHidden = document.getElementById(hidingDiv) 
  if (divSectionShowed.style.display !== "none") {
    divSectionHidden.style.display="none"
  } else {
    divSectionHidden.style.display="none"
  }
}

//Main Filter
document.getElementById("filters-button").addEventListener("click", function (event) {
  event.preventDefault()
  showAndHideFilters("filters-section")
})

//Generation Filter
document.getElementById("filter-by-generation-button").addEventListener("click", function (event) {
  event.preventDefault()
  showAndHideFilters("buttons-generation")
  hideOtherFilterDivs("buttons-generation", "buttons-type")
  hideOtherFilterDivs("buttons-generation", "buttons-resistance")
  hideOtherFilterDivs("buttons-generation", "buttons-weaknesses")
})

//Type Filter
document.getElementById("filter-by-type-button").addEventListener("click", function (event) {
  event.preventDefault()
  showAndHideFilters("buttons-type")
  hideOtherFilterDivs("buttons-type", "buttons-generation")
  hideOtherFilterDivs("buttons-type", "buttons-resistance")
  hideOtherFilterDivs("buttons-type", "buttons-weaknesses")
})

//Resistence Filter
document.getElementById("filter-by-resistance-button").addEventListener("click", function (event) {
  event.preventDefault()
  showAndHideFilters("buttons-resistance")
  hideOtherFilterDivs("buttons-resistance", "buttons-generation")
  hideOtherFilterDivs("buttons-resistance", "buttons-type")
  hideOtherFilterDivs("buttons-resistance", "buttons-weaknesses")
})

//Weaknesses Filter
document.getElementById("filter-by-weaknesses-button").addEventListener("click", function (event) {
  event.preventDefault()
  showAndHideFilters("buttons-weaknesses")
  hideOtherFilterDivs("buttons-weaknesses", "buttons-generation")
  hideOtherFilterDivs("buttons-weaknesses", "buttons-type")
  hideOtherFilterDivs("buttons-weaknesses", "buttons-resistance")
})


// SEÇÃO: FILTRAGEM DA GERAÇÃO DO POKEMON (NÚMERO E NOME)

//1. Criação de listas de pokemons:
function listPokemonsByGeneration (dataset) {
  const listOfPokemons = dataset.reduce((accumulator, dataset) => {
    accumulator += `
    <div class="pokemon-card"> 
    <li class="lista-de-pokemons"> 
      <img class="imagem-do-pokemon" alt="${dataset.name}" src="https://pokeres.bastionbot.org/images/pokemon/${dataset.num2}.png">
      <p class="id-do-pokemon">#${dataset["num"]} </p> 
      <p class="nome-do-pokemon"> ${dataset["name"]} </p> 
      <p class="tipo-do-pokemon" value= ${dataset["type"][0]}> ${dataset["type2"][0]} </p> 
      <p class="tipo-do-pokemon" value= ${dataset["type"][1]}> ${dataset["type2"][1]} </p> 
    </li>
  </div> `
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
    <div class="pokemon-card"> 
        <li class="lista-de-pokemons"> 
          <img class="imagem-do-pokemon" alt="${dataset.name}" src="https://pokeres.bastionbot.org/images/pokemon/${dataset.num2}.png">
          <p class="id-do-pokemon">#${dataset["num"]} </p> 
          <p class="nome-do-pokemon"> ${dataset["name"]} </p> 
          <p class="tipo-do-pokemon" value= ${dataset["type"][0]}> ${dataset["type2"][0]} </p> 
          <p class="tipo-do-pokemon" value= ${dataset["type"][1]}> ${dataset["type2"][1]} </p>           
        </li>
      </div> `
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
    functionTypeResultMerged = functionTypeResult1.concat(functionTypeResult2)
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


// SEÇÃO: FILTRAGEM POR RESISTÊNCIA:
//1. Criação de listas de pokemons:
function listPokemonsByResistance (dataset) {
  const listOfPokemons = dataset.reduce((accumulator, dataset) => {
    accumulator += `
    <div class="pokemon-card"> 
        <li class="lista-de-pokemons"> 
          <img class="imagem-do-pokemon" alt="${dataset.name}" src="https://pokeres.bastionbot.org/images/pokemon/${dataset.num2}.png">
          <p class="id-do-pokemon">#${dataset["num"]} </p> 
          <p class="nome-do-pokemon"> ${dataset["name"]} </p> 
          <p class="tipo-do-pokemon" value= ${dataset["type"][0]}> ${dataset["type2"][0]} </p> 
          <p class="tipo-do-pokemon" value= ${dataset["type"][1]}> ${dataset["type2"][1]} </p> 
          <p id="resistant-to"> Resistente à </p>
          <p class="resistencia-do-pokemon" value= R${dataset["resistant"][0]}>${dataset["resistant2"][0]} </p> 
          <span class="tooltiptext">${dataset["resistant3"][0]}</span>
          <p class="resistencia-do-pokemon" value= R${dataset["resistant"][1]}>${dataset["resistant2"][1]} </p> 
          <span class="tooltiptext">${dataset["resistant3"][1]}</span>
          <p class="resistencia-do-pokemon" value= R${dataset["resistant"][2]}>${dataset["resistant2"][2]} </p> 
          <span class="tooltiptext">${dataset["resistant3"][2]}</span>
          <p class="resistencia-do-pokemon" value= R${dataset["resistant"][3]}>${dataset["resistant2"][3]} </p> 
          <span class="tooltiptext">${dataset["resistant3"][3]}</span>
          <p class="resistencia-do-pokemon" value= R${dataset["resistant"][4]}>${dataset["resistant2"][4]} </p> 
          <span class="tooltiptext">${dataset["resistant3"][4]}</span>
          <p class="resistencia-do-pokemon" value= R${dataset["resistant"][5]}>${dataset["resistant2"][5]} </p> 
          <span class="tooltiptext">${dataset["resistant3"][5]}</span>
          <p class="resistencia-do-pokemon" value= R${dataset["resistant"][6]}>${dataset["resistant2"][6]} </p> 
          <span class="tooltiptext">${dataset["resistant3"][6]}</span>
        </li>
      </div> `
    return accumulator
  },[])
  
  const printList= document.getElementById("lista-impressa")
  printList .innerHTML = listOfPokemons
  
}

//2. Impressão da lista de pokemons completa:
listPokemonsByResistance(pokemon)

//3. Manipulação do DOM
let functionResistanceResult1 = "";
let functionResistanceResult2 = "";
let functionResistanceResult3 = "";
let functionResistanceResult4 = "";
let functionResistanceResult5 = "";
let functionResistanceResult6 = "";
let functionResistanceResult7 = "";
let functionResistanceResultMerged = [];
let resistanceButton = "";


//3.a) Criação da função geral dos botões:
function resistanceButtonsFunction (resistanceInput) {
  document.getElementById(resistanceInput).addEventListener("click", function (event) {
    event.preventDefault()
    resistanceButton = event.target.value;
    functionResistanceResult1 = functions.filterData(pokemon, ["resistant"],[0], resistanceButton);
    functionResistanceResult2 = functions.filterData(pokemon, ["resistant"],[1], resistanceButton);
    functionResistanceResult3 = functions.filterData(pokemon, ["resistant"],[2], resistanceButton);
    functionResistanceResult4 = functions.filterData(pokemon, ["resistant"],[3], resistanceButton);
    functionResistanceResult5 = functions.filterData(pokemon, ["resistant"],[4], resistanceButton);
    functionResistanceResult6 = functions.filterData(pokemon, ["resistant"],[5], resistanceButton);
    functionResistanceResult7 = functions.filterData(pokemon, ["resistant"],[6], resistanceButton);
  
    functionResistanceResultMerged = functionResistanceResult1.concat(functionResistanceResult2,functionResistanceResult3,
    functionResistanceResult4, functionResistanceResult5, functionResistanceResult6, functionResistanceResult7)
    
    listPokemonsByResistance(functionResistanceResultMerged)
    filterNames()
  })
}

//3.b) Criação de um array com o nome dos botões:
let pokemonResistance = ["bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost",
"grass", "ground","ice", "normal", "poison", "psychic", "rock", "water", "steel"]

//3.b.I) Adição do sufixo "-type-button"
for (let i=0; i<pokemonResistance.length; i++) {
  pokemonResistance[i] = pokemonResistance[i] + "-resistance-button" 
}

//3.c) Aplicação da função geral do botão para cada elemento da array(cada nome de botão)
pokemonResistance.map(resistanceButtonsFunction)


// SEÇÃO: FILTRAGEM POR FRAQUEZA:
//1. Criação de listas de pokemons:
function listPokemonsByWeaknesses (dataset) {
  const listOfPokemons = dataset.reduce((accumulator, dataset) => {
  accumulator += `
  <div class="pokemon-card"> 
  <li class="lista-de-pokemons"> 
  <img class="imagem-do-pokemon" alt="${dataset.name}" src="https://pokeres.bastionbot.org/images/pokemon/${dataset.num2}.png">
  <p class="id-do-pokemon">#${dataset["num"]} </p> 
  <p class="nome-do-pokemon"> ${dataset["name"]} </p> 
  <p class="tipo-do-pokemon" value= ${dataset["type"][0]}> ${dataset["type2"][0]} </p> 
  <p class="tipo-do-pokemon" value= ${dataset["type"][1]}> ${dataset["type2"][1]} </p> 
  <p id="weak-to"> Fraco contra</p>
  <p class="fraqueza-do-pokemon" value= R${dataset["weaknesses"][0]}>${dataset["weaknesses2"][0]} </p> 
  <span class="tooltiptext">${dataset["weaknesses3"][0]}</span>
  <p class="fraqueza-do-pokemon" value= R${dataset["weaknesses"][1]}>${dataset["weaknesses2"][1]} </p> 
  <span class="tooltiptext">${dataset["weaknesses3"][1]}</span>
  <p class="fraqueza-do-pokemon" value= R${dataset["weaknesses"][2]}>${dataset["weaknesses2"][2]} </p> 
  <span class="tooltiptext">${dataset["weaknesses3"][2]}</span>
  <p class="fraqueza-do-pokemon" value= R${dataset["weaknesses"][3]}>${dataset["weaknesses2"][3]} </p> 
  <span class="tooltiptext">${dataset["weaknesses3"][3]}</span>
  <p class="fraqueza-do-pokemon" value= R${dataset["weaknesses"][4]}>${dataset["weaknesses2"][4]} </p> 
  <span class="tooltiptext">${dataset["weaknesses3"][4]}</span>
  <p class="fraqueza-do-pokemon" value= R${dataset["weaknesses"][5]}>${dataset["weaknesses2"][5]} </p> 
  <span class="tooltiptext">${dataset["weaknesses3"][5]}</span>
  <p class="fraqueza-do-pokemon" value= R${dataset["weaknesses"][6]}>${dataset["weaknesses2"][6]} </p> 
  <span class="tooltiptext">${dataset["weaknesses3"][6]}</span>
  </li>
  </div> `
  return accumulator
  },[])
  const printList= document.getElementById("lista-impressa")
  printList .innerHTML = listOfPokemons
  }
  
  //2. Impressão da lista de pokemons completa:
  listPokemonsByWeaknesses(pokemon)
  
  //3. Manipulação do DOM
  let functionWeaknessesResult1 = "";
  let functionWeaknessesResult2 = "";
  let functionWeaknessesResult3 = "";
  let functionWeaknessesResult4 = "";
  let functionWeaknessesResult5 = "";
  let functionWeaknessesResult6 = "";
  let functionWeaknessesResult7 = "";
  let functionWeaknessesResultMerged = "";
  let WeaknessesButton = "";
  
  //3.a) Criação da função geral dos botões:
  function WeaknessesButtonsFunction (WeaknessesInput) {
  document.getElementById(WeaknessesInput).addEventListener("click", function (event) {
  event.preventDefault()
  WeaknessesButton = event.target.value;
  functionWeaknessesResult1 = functions.filterData(pokemon, ["weaknesses"],[0], WeaknessesButton);
  functionWeaknessesResult2 = functions.filterData(pokemon, ["weaknesses"],[1], WeaknessesButton);
  functionWeaknessesResult3 = functions.filterData(pokemon, ["weaknesses"],[2], WeaknessesButton);
  functionWeaknessesResult4 = functions.filterData(pokemon, ["weaknesses"],[3], WeaknessesButton);
  functionWeaknessesResult5 = functions.filterData(pokemon, ["weaknesses"],[4], WeaknessesButton);
  functionWeaknessesResult6 = functions.filterData(pokemon, ["weaknesses"],[5], WeaknessesButton);
  functionWeaknessesResult7 = functions.filterData(pokemon, ["weaknesses"],[6], WeaknessesButton);

  functionWeaknessesResultMerged = functionWeaknessesResult1.concat(functionWeaknessesResult2, functionWeaknessesResult3,
  functionWeaknessesResult4, functionWeaknessesResult5, functionWeaknessesResult6, functionWeaknessesResult7)

  listPokemonsByWeaknesses(functionWeaknessesResultMerged)
  filterNames()
  })
  }

  //3.b) Criação de um array com o nome dos botões:
  let pokemonWeaknesses = ["bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost",
  "grass", "ground","ice", "normal", "poison", "psychic", "rock", "water", "steel"]
  
  //3.b.I) Adição do sufixo "-type-button"
  for (let i=0; i<pokemonWeaknesses.length; i++) {
  pokemonWeaknesses[i] = pokemonWeaknesses[i] + "-weaknesses-button" 
  }
  
  //3.c) Aplicação da função geral do botão para cada elemento da array(cada nome de botão)
  pokemonWeaknesses.map(WeaknessesButtonsFunction)
  



// let average = pokemon.reduce((a,c) =>  a+c["stats"]["base-attack"]/251,0)
// console.log(average)
// console.log(pokemon)

//console.log(functions.computeStats(pokemon, "stats", "base-attack"))
listPokemonsByType(pokemon)