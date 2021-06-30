///SEÇÃO 1: IMPORTAÇÃO DAS FUNÇÕES
import { filterData } from './data.js'
import { sortData } from './data.js';
import { computeStats } from './data.js';

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

// Transformando o valor da null da propriedade spawn-chance:
for (let i=0; i < pokemon.length; i++) {
  if(pokemon[i]["spawn-chance"] === null){
    pokemon[i]["spawn-chance"] = "0"
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
  pokemon[i].PTPokemonResistant = [];
  for (let j =0; j <pokemon[i].resistant.length; j++) {
    switch (pokemon[i].resistant[j]) {
    case "Bug":
      pokemon[i].PTPokemonResistant[j] = "IN"
      break
    case "Dark":
      pokemon[i].PTPokemonResistant[j] = "SO" 
      break
    case "Dragon":
      pokemon[i].PTPokemonResistant[j] = "DG" 
      break
    case "Electric":
      pokemon[i].PTPokemonResistant[j] = "EL"
      break  
    case "Fairy":
      pokemon[i].PTPokemonResistant[j] = "FA"  
      break
    case "Fighting":
      pokemon[i].PTPokemonResistant[j] = "LU"  
      break
    case "Fire":
      pokemon[i].PTPokemonResistant[j] = "FO"  
      break
    case "Flying":
      pokemon[i].PTPokemonResistant[j] = "VO"  
      break
    case "Ghost":
      pokemon[i].PTPokemonResistant[j] = "FT" 
      break 
    case "Grass":
      pokemon[i].PTPokemonResistant[j] = "PL"
      break
    case "Ground":
      pokemon[i].PTPokemonResistant[j] = "TE"
      break
    case "Ice":
      pokemon[i].PTPokemonResistant[j] = "GE"
      break
    case "Normal":
      pokemon[i].PTPokemonResistant[j] = "NO"
      break
    case "Poison":
      pokemon[i].PTPokemonResistant[j] = "VE"
      break
    case "Psychic":
      pokemon[i].PTPokemonResistant[j] = "PS"
      break
    case "Rock":
      pokemon[i].PTPokemonResistant[j] = "PE"
      break
    case "Steel":
      pokemon[i].PTPokemonResistant[j] = "AÇ"
      break
    case "Water":
      pokemon[i].PTPokemonResistant[j] = "ÁG"
      break
    default:
      pokemon[i].PTPokemonResistant[j] = ""
      break
    }
  }
}

// Criar terceira coluna de resistencia para transformar em português:
for (let i=0; i < pokemon.length; i++) {
  pokemon[i].pokemonResistantInitials = [];
  for (let j =0; j <pokemon[i].resistant.length; j++) {
    switch (pokemon[i].resistant[j]) {
    case "Bug":
      pokemon[i].pokemonResistantInitials[j] = "Inseto"
      break
    case "Dark":
      pokemon[i].pokemonResistantInitials[j] = "Sombrio" 
      break
    case "Dragon":
      pokemon[i].pokemonResistantInitials[j] = "Dragão" 
      break
    case "Electric":
      pokemon[i].pokemonResistantInitials[j] = "Elétrico"
      break  
    case "Fairy":
      pokemon[i].pokemonResistantInitials[j] = "Fada"  
      break
    case "Fighting":
      pokemon[i].pokemonResistantInitials[j] = "Lutador"  
      break
    case "Fire":
      pokemon[i].pokemonResistantInitials[j] = "Fogo"  
      break
    case "Flying":
      pokemon[i].pokemonResistantInitials[j] = "Voador"  
      break
    case "Ghost":
      pokemon[i].pokemonResistantInitials[j] = "Fantasma" 
      break 
    case "Grass":
      pokemon[i].pokemonResistantInitials[j] = "Planta"
      break
    case "Ground":
      pokemon[i].pokemonResistantInitials[j] = "Terreste"
      break
    case "Ice":
      pokemon[i].pokemonResistantInitials[j] = "Gelo"
      break
    case "Normal":
      pokemon[i].pokemonResistantInitials[j] = "Normal"
      break
    case "Poison":
      pokemon[i].pokemonResistantInitials[j] = "Venenoso"
      break
    case "Psychic":
      pokemon[i].pokemonResistantInitials[j] = "Psíquico"
      break
    case "Rock":
      pokemon[i].pokemonResistantInitials[j] = "Pedra"
      break
    case "Steel":
      pokemon[i].pokemonResistantInitials[j] = "Aço"
      break
    case "Water":
      pokemon[i].pokemonResistantInitials[j] = "Água"
      break
    default:
      pokemon[i].pokemonResistantInitials[j] = ""
      break
    }
  }
}

// Criar segunda coluna de fraqueza para transformar em apenas 2 letras:
for (let i=0; i < pokemon.length; i++) {
  pokemon[i].PTPokemonWeaknesses = [];
  for (let j =0; j <pokemon[i].weaknesses.length; j++) {
    switch (pokemon[i].weaknesses[j]) {
    case "Bug":
      pokemon[i].PTPokemonWeaknesses[j] = "IN"
      break
    case "Dark":
      pokemon[i].PTPokemonWeaknesses[j] = "SO" 
      break
    case "Dragon":
      pokemon[i].PTPokemonWeaknesses[j] = "DG" 
      break
    case "Electric":
      pokemon[i].PTPokemonWeaknesses[j] = "EL"
      break  
    case "Fairy":
      pokemon[i].PTPokemonWeaknesses[j] = "FA"  
      break
    case "Fighting":
      pokemon[i].PTPokemonWeaknesses[j] = "LU"  
      break
    case "Fire":
      pokemon[i].PTPokemonWeaknesses[j] = "FO"  
      break
    case "Flying":
      pokemon[i].PTPokemonWeaknesses[j] = "VO"  
      break
    case "Ghost":
      pokemon[i].PTPokemonWeaknesses[j] = "FT" 
      break 
    case "Grass":
      pokemon[i].PTPokemonWeaknesses[j] = "PL"
      break
    case "Ground":
      pokemon[i].PTPokemonWeaknesses[j] = "TE"
      break
    case "Ice":
      pokemon[i].PTPokemonWeaknesses[j] = "GE"
      break
    case "Normal":
      pokemon[i].PTPokemonWeaknesses[j] = "NO"
      break
    case "Poison":
      pokemon[i].PTPokemonWeaknesses[j] = "VE"
      break
    case "Psychic":
      pokemon[i].PTPokemonWeaknesses[j] = "PS"
      break
    case "Rock":
      pokemon[i].PTPokemonWeaknesses[j] = "PE"
      break
    case "Steel":
      pokemon[i].PTPokemonWeaknesses[j] = "AÇ"
      break
    case "Water":
      pokemon[i].PTPokemonWeaknesses[j] = "ÁG"
      break
    default:
      pokemon[i].PTPokemonWeaknesses[j] = ""
      break
    }
  }
}

// Criar terceira coluna de resistencia para transformar em português:
for (let i=0; i < pokemon.length; i++) {
  pokemon[i].pokemonWeaknessesInitials = [];
  for (let j =0; j <pokemon[i].weaknesses.length; j++) {
    switch (pokemon[i].weaknesses[j]) {
    case "Bug":
      pokemon[i].pokemonWeaknessesInitials[j] = "Inseto"
      break
    case "Dark":
      pokemon[i].pokemonWeaknessesInitials[j] = "Sombrio" 
      break
    case "Dragon":
      pokemon[i].pokemonWeaknessesInitials[j] = "Dragão" 
      break
    case "Electric":
      pokemon[i].pokemonWeaknessesInitials[j] = "Elétrico"
      break  
    case "Fairy":
      pokemon[i].pokemonWeaknessesInitials[j] = "Fada"  
      break
    case "Fighting":
      pokemon[i].pokemonWeaknessesInitials[j] = "Lutador"  
      break
    case "Fire":
      pokemon[i].pokemonWeaknessesInitials[j] = "Fogo"  
      break
    case "Flying":
      pokemon[i].pokemonWeaknessesInitials[j] = "Voador"  
      break
    case "Ghost":
      pokemon[i].pokemonWeaknessesInitials[j] = "Fantasma" 
      break 
    case "Grass":
      pokemon[i].pokemonWeaknessesInitials[j] = "Planta"
      break
    case "Ground":
      pokemon[i].pokemonWeaknessesInitials[j] = "Terreste"
      break
    case "Ice":
      pokemon[i].pokemonWeaknessesInitials[j] = "Gelo"
      break
    case "Normal":
      pokemon[i].pokemonWeaknessesInitials[j] = "Normal"
      break
    case "Poison":
      pokemon[i].pokemonWeaknessesInitials[j] = "Venenoso"
      break
    case "Psychic":
      pokemon[i].pokemonWeaknessesInitials[j] = "Psíquico"
      break
    case "Rock":
      pokemon[i].pokemonWeaknessesInitials[j] = "Pedra"
      break
    case "Steel":
      pokemon[i].pokemonWeaknessesInitials[j] = "Aço"
      break
    case "Water":
      pokemon[i].pokemonWeaknessesInitials[j] = "Água"
      break
    default:
      pokemon[i].pokemonWeaknessesInitials[j] = ""
      break
    }
  }
}

//Médias das estatísticas:
//Trasnformação dos valores das estatísticas em numérico:
for (let i=0; i<pokemon.length; i++){
  pokemon[i].stats["base-attack"] = parseInt(pokemon[i].stats["base-attack"])
  pokemon[i].stats["base-defense"] = parseInt(pokemon[i].stats["base-defense"])
  pokemon[i].stats["base-stamina"] = parseInt(pokemon[i].stats["base-stamina"])
  pokemon[i].stats["max-cp"] = parseInt(pokemon[i].stats["max-cp"])
  pokemon[i].stats["max-hp"] = parseInt(pokemon[i].stats["max-hp"])
  
}

//Definição das médias:
const baseAttackAverage = computeStats(pokemon, ["stats"], ["base-attack"])
const baseDefenseAverage = computeStats(pokemon, ["stats"], ["base-defense"])
const baseStaminaAverage = computeStats(pokemon, ["stats"], ["base-stamina"])
const maxCpAverage= computeStats(pokemon, ["stats"], ["max-cp"])
const maxHpAverage= computeStats(pokemon, ["stats"], ["max-hp"])

//Comparação dos valores com as médias:
for (let i=0; i<pokemon.length; i++){
  pokemon[i].statusAttackGreater = "";
  pokemon[i].statusAttackLower = "";
  pokemon[i].statusDefenseGreater = "";
  pokemon[i].statusDefenseLower = "";
  pokemon[i].statusStaminaGreater = "";
  pokemon[i].statusStaminaLower = "";
  pokemon[i].statusMaxCpGreater = "";
  pokemon[i].statusMaxCpLower = "";
  pokemon[i].statusMaxHpGreater = "";
  pokemon[i].statusMaxHpLower = "";

  if (pokemon[i].stats["base-attack"] >= baseAttackAverage) {
    pokemon[i].statusAttackGreater = "↑";
  } else {
    pokemon[i].statusAttackLower = "↓";
  }

  if (pokemon[i].stats["base-defense"] >= baseDefenseAverage) {
    pokemon[i].statusDefenseGreater = "↑";
  } else {
    pokemon[i].statusDefenseLower = "↓";
  }

  if (pokemon[i].stats["base-stamina"] >= baseStaminaAverage) {
    pokemon[i].statusStaminaGreater = "↑";
  } else {
    pokemon[i].statusStaminaLower = "↓";
  }

  if (pokemon[i].stats["max-cp"] >= maxCpAverage) {
    pokemon[i].statusMaxCpGreater = "↑";
  } else {
    pokemon[i].statusMaxCpLower = "↓";
  }

  if (pokemon[i].stats["max-hp"] >= maxHpAverage) {
    pokemon[i].statusMaxHpGreater = "↑";
  } else {
    pokemon[i].statusMaxHpLower = "↓";
  }


}

//Criação de listas de pokemons
function listPokemons (dataset) {
  const listOfPokemons = dataset.reduce((accumulator, dataset) => {
    accumulator += `
      <div class="card">

        <div class="front-card"> 
          <li class="front-list"> 
            <img class="front-pokemon-image front-general-card-image" alt="${dataset.name}" src="https://pokeres.bastionbot.org/images/pokemon/${dataset.num2}.png">
            <p class="front-pokemon-id">#${dataset["num"]} </p> 
            <p class="front-pokemon-name"> ${dataset["name"]} </p> 
            <p class="front-pokemon-type" value= ${dataset["type"][0]}> ${dataset["type2"][0]} </p> 
            <p class="front-pokemon-type" value= ${dataset["type"][1]}> ${dataset["type2"][1]} </p>
          </li>
        </div> 

        <div class="back-card"> 
          <li class="back-list">  

            <div class="back-pokemon-size">
              <h1 class="back-card-titles"> Tamanho do Pokemon </h1>
              <img class="back-size-figures" alt="Peso" src="images/weigth.svg">
              <span class="back-tooltiptext">Peso </span>
              <span>${dataset["size"]["weight"]}</span> 
              <img class="back-size-figures" alt="Altura" src="images/heigth.jpg">
              <span class="back-tooltiptext">Altura</span>
              <span>${dataset["size"]["height"]}</span> 
            </div>

            <div class="back-pokemon-stats">
              <h1 class="back-card-titles"> Estatísticas</h1>

              <img class="back-stats-figures" alt="Ataque" src="images/sword.png">
              <span class="back-tooltiptext">Ataque</span>
              <span>${dataset["stats"]["base-attack"]}</span>
              <span class="back-greater-than-average-arrow" > ${dataset["statusAttackGreater"]} </span> 
              <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
              <span class="back-lower-than-average-arrow"> ${dataset["statusAttackLower"]} </span>
              <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
             
              <img class="back-stats-figures" alt="Escudo" src="images/shield.png">
              <span class="back-tooltiptext">Defesa</span>
              <span>${dataset["stats"]["base-defense"]}</span> 
              <span class="back-greater-than-average-arrow" > ${dataset["statusDefenseGreater"]} </span> 
              <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
              <span class="back-lower-than-average-arrow"> ${dataset["statusDefenseLower"]} </span> 
              <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
          
              <img class="back-stats-figures" alt="Energia" src="images/stamina.png">
              <span class="back-tooltiptext">Stamina</span>
              <span>${dataset["stats"]["base-stamina"]}</span> 
              <span class="back-greater-than-average-arrow" > ${dataset["statusStaminaGreater"]} </span>
              <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span> 
              <span class="back-lower-than-average-arrow"> ${dataset["statusStaminaLower"]}</span> 
              <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
            
              <br>

              <img  class="back-stats-figures" alt="Combate" src="images/vs.jpg">
              <span class="back-tooltiptext">Poder de Combate</span>
              <span>${dataset["stats"]["max-cp"]}</span> 
              <span class="back-greater-than-average-arrow"> ${dataset["statusMaxCpGreater"]}</span> 
              <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
              <span class="back-lower-than-average-arrow"> ${dataset["statusMaxCpLower"]} </span> 
              <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
            
              <img class="back-stats-figures" alt="Vida" src="images/heart.jpg">
              <span class="back-tooltiptext">Pontos de Vida</span>
              <span>${dataset["stats"]["max-hp"]}</span> 
              <span class="back-greater-than-average-arrow"> ${dataset["statusMaxHpGreater"]} </span> 
              <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
              <span class="back-lower-than-average-arrow" > ${dataset["statusMaxHpLower"]} </span> 
              <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
            </div>

            <div class="back-resistant-to">
              <p class="back-card-titles"> Resistente à </p>
              <p class="pokemon-resistance" value= R${dataset["resistant"][0]}>${dataset["PTPokemonResistant"][0]} </p> 
              <span class="tooltiptext">${dataset["pokemonResistantInitials"][0]}</span>
              <p class="pokemon-resistance" value= R${dataset["resistant"][1]}>${dataset["PTPokemonResistant"][1]} </p> 
              <span class="tooltiptext">${dataset["pokemonResistantInitials"][1]}</span>
              <p class="pokemon-resistance" value= R${dataset["resistant"][2]}>${dataset["PTPokemonResistant"][2]} </p> 
              <span class="tooltiptext">${dataset["pokemonResistantInitials"][2]}</span>
              <p class="pokemon-resistance" value= R${dataset["resistant"][3]}>${dataset["PTPokemonResistant"][3]} </p> 
              <span class="tooltiptext">${dataset["pokemonResistantInitials"][3]}</span>
              <p class="pokemon-resistance" value= R${dataset["resistant"][4]}>${dataset["PTPokemonResistant"][4]} </p> 
              <span class="tooltiptext">${dataset["pokemonResistantInitials"][4]}</span>
              <p class="pokemon-resistance" value= R${dataset["resistant"][5]}>${dataset["PTPokemonResistant"][5]} </p> 
              <span class="tooltiptext">${dataset["pokemonResistantInitials"][5]}</span>
              <p class="pokemon-resistance" value= R${dataset["resistant"][6]}>${dataset["PTPokemonResistant"][6]} </p> 
              <span class="tooltiptext">${dataset["pokemonResistantInitials"][6]}</span>
            </div>
            <div class="back-weak-to">
              <p class="back-card-titles"> Fraco contra</p>
              <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][0]}>${dataset["PTPokemonWeaknesses"][0]} </p> 
              <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][0]}</span>
              <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][1]}>${dataset["PTPokemonWeaknesses"][1]} </p> 
              <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][1]}</span>
              <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][2]}>${dataset["PTPokemonWeaknesses"][2]} </p> 
              <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][2]}</span>
              <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][3]}>${dataset["PTPokemonWeaknesses"][3]} </p> 
              <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][3]}</span>
              <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][4]}>${dataset["PTPokemonWeaknesses"][4]} </p> 
              <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][4]}</span>
              <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][5]}>${dataset["PTPokemonWeaknesses"][5]} </p> 
              <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][5]}</span>
              <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][6]}>${dataset["PTPokemonWeaknesses"][6]} </p> 
              <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][6]}</span>
            
              </div>
              <p class="back-pokemon-generation"> Geração ${dataset["generation"]["num"]}  </p>
            </li>
        </div> 
      </div>   
          `
         return accumulator
    },[])
        
      const printList= document.getElementById("lista-impressa")
      printList.innerHTML = listOfPokemons
  }




// SEÇÃO: ORDENAÇÃO POR RARIDADE, NOME, DISTÂNCIA DOS OVOS e PROBABILIDADE DE APARIÇÃO

  //1. Criação de listas de pokemons por raridade
function listPokemonsByRarity (dataset) {
    const listOfPokemonsByRarity = dataset.reduce((accumulator, dataset) => {
      accumulator += `
      <div class="card">

        <div class="front-card"> 
          <li class="front-list"> 
            <img class="front-pokemon-image" alt="${dataset.name}" src="https://pokeres.bastionbot.org/images/pokemon/${dataset.num2}.png">
            <p class="front-pokemon-id">#${dataset["num"]} </p> 
            <p class="front-pokemon-name"> ${dataset["name"]} </p> 
            <p class="front-pokemon-type" value= ${dataset["type"][0]}> ${dataset["type2"][0]} </p> 
            <p class="front-pokemon-type" value= ${dataset["type"][1]}> ${dataset["type2"][1]} </p> 
            <p class="front-pokemon-rarity" value= ${dataset["pokemon-rarity"]}>Nível de Raridade: ${dataset["pokemon-rarity"]}</p> 
          </li>
        </div> 

        <div class="back-card"> 
          <li class="back-list">  

            <div class="back-pokemon-size">
              <h1 class="back-card-titles"> Tamanho do Pokemon </h1>
              <img class="back-size-figures" alt="Peso" src="images/weigth.svg">
              <span class="back-tooltiptext">Peso </span>
              <span>${dataset["size"]["weight"]}</span> 
              <img class="back-size-figures" alt="Altura" src="images/heigth.jpg">
              <span class="back-tooltiptext">Altura</span>
              <span>${dataset["size"]["height"]}</span> 
            </div>

            <div class="back-pokemon-stats">
              <h1 class="back-card-titles"> Estatísticas</h1>

              <img class="back-stats-figures" alt="Ataque" src="images/sword.png">
              <span class="back-tooltiptext">Ataque</span>
              <span>${dataset["stats"]["base-attack"]}</span>
              <span class="back-greater-than-average-arrow" > ${dataset["statusAttackGreater"]} </span> 
              <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
              <span class="back-lower-than-average-arrow"> ${dataset["statusAttackLower"]} </span>
              <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
             
              <img class="back-stats-figures" alt="Escudo" src="images/shield.png">
              <span class="back-tooltiptext">Defesa</span>
              <span>${dataset["stats"]["base-defense"]}</span> 
              <span class="back-greater-than-average-arrow" > ${dataset["statusDefenseGreater"]} </span> 
              <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
              <span class="back-lower-than-average-arrow"> ${dataset["statusDefenseLower"]} </span> 
              <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
          
              <img class="back-stats-figures" alt="Energia" src="images/stamina.png">
              <span class="back-tooltiptext">Stamina</span>
              <span>${dataset["stats"]["base-stamina"]}</span> 
              <span class="back-greater-than-average-arrow" > ${dataset["statusStaminaGreater"]} </span>
              <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span> 
              <span class="back-lower-than-average-arrow"> ${dataset["statusStaminaLower"]}</span> 
              <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
            
              <br>

              <img  class="back-stats-figures" alt="Combate" src="images/vs.jpg">
              <span class="back-tooltiptext">Poder de Combate</span>
              <span>${dataset["stats"]["max-cp"]}</span> 
              <span class="back-greater-than-average-arrow"> ${dataset["statusMaxCpGreater"]}</span> 
              <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
              <span class="back-lower-than-average-arrow"> ${dataset["statusMaxCpLower"]} </span> 
              <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
            
              <img class="back-stats-figures" alt="Vida" src="images/heart.jpg">
              <span class="back-tooltiptext">Pontos de Vida</span>
              <span>${dataset["stats"]["max-hp"]}</span> 
              <span class="back-greater-than-average-arrow"> ${dataset["statusMaxHpGreater"]} </span> 
              <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
              <span class="back-lower-than-average-arrow" > ${dataset["statusMaxHpLower"]} </span> 
              <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
            </div>

            <div class="back-resistant-to">
              <p class="back-card-titles"> Resistente à </p>
              <p class="pokemon-resistance" value= R${dataset["resistant"][0]}>${dataset["PTPokemonResistant"][0]} </p> 
              <span class="tooltiptext">${dataset["pokemonResistantInitials"][0]}</span>
              <p class="pokemon-resistance" value= R${dataset["resistant"][1]}>${dataset["PTPokemonResistant"][1]} </p> 
              <span class="tooltiptext">${dataset["pokemonResistantInitials"][1]}</span>
              <p class="pokemon-resistance" value= R${dataset["resistant"][2]}>${dataset["PTPokemonResistant"][2]} </p> 
              <span class="tooltiptext">${dataset["pokemonResistantInitials"][2]}</span>
              <p class="pokemon-resistance" value= R${dataset["resistant"][3]}>${dataset["PTPokemonResistant"][3]} </p> 
              <span class="tooltiptext">${dataset["pokemonResistantInitials"][3]}</span>
              <p class="pokemon-resistance" value= R${dataset["resistant"][4]}>${dataset["PTPokemonResistant"][4]} </p> 
              <span class="tooltiptext">${dataset["pokemonResistantInitials"][4]}</span>
              <p class="pokemon-resistance" value= R${dataset["resistant"][5]}>${dataset["PTPokemonResistant"][5]} </p> 
              <span class="tooltiptext">${dataset["pokemonResistantInitials"][5]}</span>
              <p class="pokemon-resistance" value= R${dataset["resistant"][6]}>${dataset["PTPokemonResistant"][6]} </p> 
              <span class="tooltiptext">${dataset["pokemonResistantInitials"][6]}</span>
            </div>
            <div class="back-weak-to">
              <p class="back-card-titles"> Fraco contra</p>
              <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][0]}>${dataset["PTPokemonWeaknesses"][0]} </p> 
              <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][0]}</span>
              <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][1]}>${dataset["PTPokemonWeaknesses"][1]} </p> 
              <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][1]}</span>
              <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][2]}>${dataset["PTPokemonWeaknesses"][2]} </p> 
              <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][2]}</span>
              <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][3]}>${dataset["PTPokemonWeaknesses"][3]} </p> 
              <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][3]}</span>
              <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][4]}>${dataset["PTPokemonWeaknesses"][4]} </p> 
              <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][4]}</span>
              <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][5]}>${dataset["PTPokemonWeaknesses"][5]} </p> 
              <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][5]}</span>
              <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][6]}>${dataset["PTPokemonWeaknesses"][6]} </p> 
              <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][6]}</span>
            
              </div>
              <p class="back-pokemon-generation"> Geração ${dataset["generation"]["num"]}  </p>
            </li>
        </div> 
      </div>  `
      return accumulator
    },[])
    
    const printList= document.getElementById("lista-impressa")
    printList.innerHTML = listOfPokemonsByRarity
  }

//2. Criação de listas de pokemons por distância de ovos
  function listPokemonsByEgg (dataset) {
      const listOfPokemonsByEgg = dataset.reduce((accumulator, dataset) => {
        accumulator += `
        <div class="card">

        <div class="front-card"> 
          <li class="front-list"> 
            <img class="front-pokemon-image" alt="${dataset.name}" src="https://pokeres.bastionbot.org/images/pokemon/${dataset.num2}.png">
            <p class="front-pokemon-id">#${dataset["num"]} </p> 
            <p class="front-pokemon-name"> ${dataset["name"]} </p> 
            <p class="front-pokemon-type" value= ${dataset["type"][0]}> ${dataset["type2"][0]} </p> 
            <p class="front-pokemon-type" value= ${dataset["type"][1]}> ${dataset["type2"][1]} </p> 
            <p class="front-eggs-distance"  value= ${dataset["egg"]}> Distância dos Ovos: ${dataset["egg"]}</p>
          </li>
        </div> 

        <div class="back-card"> 
        <li class="back-list">  

          <div class="back-pokemon-size">
            <h1 class="back-card-titles"> Tamanho do Pokemon </h1>
            <img class="back-size-figures" alt="Peso" src="images/weigth.svg">
            <span class="back-tooltiptext">Peso </span>
            <span>${dataset["size"]["weight"]}</span> 
            <img class="back-size-figures" alt="Altura" src="images/heigth.jpg">
            <span class="back-tooltiptext">Altura</span>
            <span>${dataset["size"]["height"]}</span> 
          </div>

          <div class="back-pokemon-stats">
            <h1 class="back-card-titles"> Estatísticas</h1>

            <img class="back-stats-figures" alt="Ataque" src="images/sword.png">
            <span class="back-tooltiptext">Ataque</span>
            <span>${dataset["stats"]["base-attack"]}</span>
            <span class="back-greater-than-average-arrow" > ${dataset["statusAttackGreater"]} </span> 
            <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
            <span class="back-lower-than-average-arrow"> ${dataset["statusAttackLower"]} </span>
            <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
           
            <img class="back-stats-figures" alt="Escudo" src="images/shield.png">
            <span class="back-tooltiptext">Defesa</span>
            <span>${dataset["stats"]["base-defense"]}</span> 
            <span class="back-greater-than-average-arrow" > ${dataset["statusDefenseGreater"]} </span> 
            <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
            <span class="back-lower-than-average-arrow"> ${dataset["statusDefenseLower"]} </span> 
            <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
        
            <img class="back-stats-figures" alt="Energia" src="images/stamina.png">
            <span class="back-tooltiptext">Stamina</span>
            <span>${dataset["stats"]["base-stamina"]}</span> 
            <span class="back-greater-than-average-arrow" > ${dataset["statusStaminaGreater"]} </span>
            <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span> 
            <span class="back-lower-than-average-arrow"> ${dataset["statusStaminaLower"]}</span> 
            <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
          
            <br>

            <img  class="back-stats-figures" alt="Combate" src="images/vs.jpg">
            <span class="back-tooltiptext">Poder de Combate</span>
            <span>${dataset["stats"]["max-cp"]}</span> 
            <span class="back-greater-than-average-arrow"> ${dataset["statusMaxCpGreater"]}</span> 
            <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
            <span class="back-lower-than-average-arrow"> ${dataset["statusMaxCpLower"]} </span> 
            <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
          
            <img class="back-stats-figures" alt="Vida" src="images/heart.jpg">
            <span class="back-tooltiptext">Pontos de Vida</span>
            <span>${dataset["stats"]["max-hp"]}</span> 
            <span class="back-greater-than-average-arrow"> ${dataset["statusMaxHpGreater"]} </span> 
            <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
            <span class="back-lower-than-average-arrow" > ${dataset["statusMaxHpLower"]} </span> 
            <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
          </div>

          <div class="back-resistant-to">
            <p class="back-card-titles"> Resistente à </p>
            <p class="pokemon-resistance" value= R${dataset["resistant"][0]}>${dataset["PTPokemonResistant"][0]} </p> 
            <span class="tooltiptext">${dataset["pokemonResistantInitials"][0]}</span>
            <p class="pokemon-resistance" value= R${dataset["resistant"][1]}>${dataset["PTPokemonResistant"][1]} </p> 
            <span class="tooltiptext">${dataset["pokemonResistantInitials"][1]}</span>
            <p class="pokemon-resistance" value= R${dataset["resistant"][2]}>${dataset["PTPokemonResistant"][2]} </p> 
            <span class="tooltiptext">${dataset["pokemonResistantInitials"][2]}</span>
            <p class="pokemon-resistance" value= R${dataset["resistant"][3]}>${dataset["PTPokemonResistant"][3]} </p> 
            <span class="tooltiptext">${dataset["pokemonResistantInitials"][3]}</span>
            <p class="pokemon-resistance" value= R${dataset["resistant"][4]}>${dataset["PTPokemonResistant"][4]} </p> 
            <span class="tooltiptext">${dataset["pokemonResistantInitials"][4]}</span>
            <p class="pokemon-resistance" value= R${dataset["resistant"][5]}>${dataset["PTPokemonResistant"][5]} </p> 
            <span class="tooltiptext">${dataset["pokemonResistantInitials"][5]}</span>
            <p class="pokemon-resistance" value= R${dataset["resistant"][6]}>${dataset["PTPokemonResistant"][6]} </p> 
            <span class="tooltiptext">${dataset["pokemonResistantInitials"][6]}</span>
          </div>
          <div class="back-weak-to">
            <p class="back-card-titles"> Fraco contra</p>
            <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][0]}>${dataset["PTPokemonWeaknesses"][0]} </p> 
            <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][0]}</span>
            <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][1]}>${dataset["PTPokemonWeaknesses"][1]} </p> 
            <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][1]}</span>
            <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][2]}>${dataset["PTPokemonWeaknesses"][2]} </p> 
            <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][2]}</span>
            <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][3]}>${dataset["PTPokemonWeaknesses"][3]} </p> 
            <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][3]}</span>
            <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][4]}>${dataset["PTPokemonWeaknesses"][4]} </p> 
            <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][4]}</span>
            <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][5]}>${dataset["PTPokemonWeaknesses"][5]} </p> 
            <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][5]}</span>
            <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][6]}>${dataset["PTPokemonWeaknesses"][6]} </p> 
            <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][6]}</span>
          
            </div>
            <p class="back-pokemon-generation"> Geração ${dataset["generation"]["num"]}  </p>
          </li>
      </div> 
    </div>  
      `
        return accumulator
      },[])
      
      const printList= document.getElementById("lista-impressa")
      printList.innerHTML = listOfPokemonsByEgg
  }

  //3. Criação de listas de pokemons pela probabilidade de aparição
  function listPokemonsBySpawn (dataset) {
    const listOfPokemonsBySpawn = dataset.reduce((accumulator, dataset) => {
      accumulator += `
      <div class="card">

        <div class="front-card front-card-spawn-chance"> 
          <li class="front-list"> 
            <img class="front-pokemon-image" alt="${dataset.name}" src="https://pokeres.bastionbot.org/images/pokemon/${dataset.num2}.png">
            <p class="front-pokemon-id">#${dataset["num"]} </p> 
            <p class="front-pokemon-name"> ${dataset["name"]} </p> 
            <p class="front-pokemon-type" value= ${dataset["type"][0]}> ${dataset["type2"][0]} </p> 
            <p class="front-pokemon-type" value= ${dataset["type"][1]}> ${dataset["type2"][1]} </p> 
            <p class="front-spawn-chance" value= ${dataset["spawn-chance"]}> Probabilidade de Aparição: ${dataset["spawn-chance"]}%</p>  
          </li>
        </div> 

        <div class="back-card"> 
        <li class="back-list">  

          <div class="back-pokemon-size">
            <h1 class="back-card-titles"> Tamanho do Pokemon </h1>
            <img class="back-size-figures" alt="Peso" src="images/weigth.svg">
            <span class="back-tooltiptext">Peso </span>
            <span>${dataset["size"]["weight"]}</span> 
            <img class="back-size-figures" alt="Altura" src="images/heigth.jpg">
            <span class="back-tooltiptext">Altura</span>
            <span>${dataset["size"]["height"]}</span> 
          </div>

          <div class="back-pokemon-stats">
            <h1 class="back-card-titles"> Estatísticas</h1>

            <img class="back-stats-figures" alt="Ataque" src="images/sword.png">
            <span class="back-tooltiptext">Ataque</span>
            <span>${dataset["stats"]["base-attack"]}</span>
            <span class="back-greater-than-average-arrow" > ${dataset["statusAttackGreater"]} </span> 
            <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
            <span class="back-lower-than-average-arrow"> ${dataset["statusAttackLower"]} </span>
            <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
           
            <img class="back-stats-figures" alt="Escudo" src="images/shield.png">
            <span class="back-tooltiptext">Defesa</span>
            <span>${dataset["stats"]["base-defense"]}</span> 
            <span class="back-greater-than-average-arrow" > ${dataset["statusDefenseGreater"]} </span> 
            <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
            <span class="back-lower-than-average-arrow"> ${dataset["statusDefenseLower"]} </span> 
            <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
        
            <img class="back-stats-figures" alt="Energia" src="images/stamina.png">
            <span class="back-tooltiptext">Stamina</span>
            <span>${dataset["stats"]["base-stamina"]}</span> 
            <span class="back-greater-than-average-arrow" > ${dataset["statusStaminaGreater"]} </span>
            <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span> 
            <span class="back-lower-than-average-arrow"> ${dataset["statusStaminaLower"]}</span> 
            <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
          
            <br>

            <img  class="back-stats-figures" alt="Combate" src="images/vs.jpg">
            <span class="back-tooltiptext">Poder de Combate</span>
            <span>${dataset["stats"]["max-cp"]}</span> 
            <span class="back-greater-than-average-arrow"> ${dataset["statusMaxCpGreater"]}</span> 
            <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
            <span class="back-lower-than-average-arrow"> ${dataset["statusMaxCpLower"]} </span> 
            <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
          
            <img class="back-stats-figures" alt="Vida" src="images/heart.jpg">
            <span class="back-tooltiptext">Pontos de Vida</span>
            <span>${dataset["stats"]["max-hp"]}</span> 
            <span class="back-greater-than-average-arrow"> ${dataset["statusMaxHpGreater"]} </span> 
            <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
            <span class="back-lower-than-average-arrow" > ${dataset["statusMaxHpLower"]} </span> 
            <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
          </div>

          <div class="back-resistant-to">
            <p class="back-card-titles"> Resistente à </p>
            <p class="pokemon-resistance" value= R${dataset["resistant"][0]}>${dataset["PTPokemonResistant"][0]} </p> 
            <span class="tooltiptext">${dataset["pokemonResistantInitials"][0]}</span>
            <p class="pokemon-resistance" value= R${dataset["resistant"][1]}>${dataset["PTPokemonResistant"][1]} </p> 
            <span class="tooltiptext">${dataset["pokemonResistantInitials"][1]}</span>
            <p class="pokemon-resistance" value= R${dataset["resistant"][2]}>${dataset["PTPokemonResistant"][2]} </p> 
            <span class="tooltiptext">${dataset["pokemonResistantInitials"][2]}</span>
            <p class="pokemon-resistance" value= R${dataset["resistant"][3]}>${dataset["PTPokemonResistant"][3]} </p> 
            <span class="tooltiptext">${dataset["pokemonResistantInitials"][3]}</span>
            <p class="pokemon-resistance" value= R${dataset["resistant"][4]}>${dataset["PTPokemonResistant"][4]} </p> 
            <span class="tooltiptext">${dataset["pokemonResistantInitials"][4]}</span>
            <p class="pokemon-resistance" value= R${dataset["resistant"][5]}>${dataset["PTPokemonResistant"][5]} </p> 
            <span class="tooltiptext">${dataset["pokemonResistantInitials"][5]}</span>
            <p class="pokemon-resistance" value= R${dataset["resistant"][6]}>${dataset["PTPokemonResistant"][6]} </p> 
            <span class="tooltiptext">${dataset["pokemonResistantInitials"][6]}</span>
          </div>
          <div class="back-weak-to">
            <p class="back-card-titles"> Fraco contra</p>
            <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][0]}>${dataset["PTPokemonWeaknesses"][0]} </p> 
            <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][0]}</span>
            <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][1]}>${dataset["PTPokemonWeaknesses"][1]} </p> 
            <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][1]}</span>
            <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][2]}>${dataset["PTPokemonWeaknesses"][2]} </p> 
            <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][2]}</span>
            <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][3]}>${dataset["PTPokemonWeaknesses"][3]} </p> 
            <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][3]}</span>
            <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][4]}>${dataset["PTPokemonWeaknesses"][4]} </p> 
            <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][4]}</span>
            <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][5]}>${dataset["PTPokemonWeaknesses"][5]} </p> 
            <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][5]}</span>
            <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][6]}>${dataset["PTPokemonWeaknesses"][6]} </p> 
            <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][6]}</span>
          
            </div>
            <p class="back-pokemon-generation"> Geração ${dataset["generation"]["num"]}  </p>
          </li>
      </div> 
    </div>  
       `
      return accumulator
    },[])
    
    const printList= document.getElementById("lista-impressa")
    printList.innerHTML = listOfPokemonsBySpawn
  }


  //4.Chamando função de ordenar
  orderButton.addEventListener("click", (event) => {
    event.preventDefault()

    const sortedData =  sortData (pokemon, order.value, option.value)

    if(order.value === "egg") {
      listPokemonsByEgg(sortedData)
    } 
    else if (order.value === "pokemon-rarity") {
      listPokemonsByRarity(sortedData)
    }
    else if (order.value === "spawn-chance"){
      listPokemonsBySpawn(sortedData)
    }
    else {
      listPokemons(sortedData)
    }

  })

//SEÇÃO : CÁLCULO AGREGADO (SPAWN-CHANCE)

//Chamando função de cálculo agregado

function spawnChanceRate () {
  const spawnChance = computeStats(pokemon, ["spawn-chance"], [""])
  
  for (let i=0; i < pokemon.length; i++) {
    if(pokemon[i]["spawn-chance"] >= spawnChance) {
      console.log("sim")
    }
    console.log("não")
  }

}

spawnChanceRate()


//SEÇÃO : FILTRO PELO TECLADO (KEYUP) 
const filterInput = document.getElementById("pokemon-search");
filterInput.addEventListener("keyup", filterNames);

function filterNames() {
  const filterValue = document.getElementById("pokemon-search").value.toUpperCase();
  const pokemonPrintedList = document.getElementById("lista-impressa");
  const pokemonList = pokemonPrintedList.getElementsByClassName("front-list");
  const pokemonCard = document.getElementsByClassName("card");

  for (let i=0; i<pokemonList.length; i++){
    let filteredPokemonCard = pokemonList[i].getElementsByClassName("front-pokemon-name")[0];
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
    accumulator +=  `
    <div class="card">

      <div class="front-card front-card-generation"> 
        <li class="front-list"> 
          <img class="front-pokemon-image" alt="${dataset.name}" src="https://pokeres.bastionbot.org/images/pokemon/${dataset.num2}.png">
          <p class="front-pokemon-id">#${dataset["num"]} </p> 
          <p class="front-pokemon-name"> ${dataset["name"]} </p> 
          <p class="front-pokemon-type" value= ${dataset["type"][0]}> ${dataset["type2"][0]} </p> 
          <p class="front-pokemon-type" value= ${dataset["type"][1]}> ${dataset["type2"][1]} </p>
          <p class="front-pokemon-generation"> Geração ${dataset["generation"]["num"]}  </p>
        </li>
      </div> 

      <div class="back-card"> 
      <li class="back-list">  

        <div class="back-pokemon-size">
          <h1 class="back-card-titles"> Tamanho do Pokemon </h1>
          <img class="back-size-figures" alt="Peso" src="images/weigth.svg">
          <span class="back-tooltiptext">Peso </span>
          <span>${dataset["size"]["weight"]}</span> 
          <img class="back-size-figures" alt="Altura" src="images/heigth.jpg">
          <span class="back-tooltiptext">Altura</span>
          <span>${dataset["size"]["height"]}</span> 
        </div>

        <div class="back-pokemon-stats">
          <h1 class="back-card-titles"> Estatísticas</h1>

          <img class="back-stats-figures" alt="Ataque" src="images/sword.png">
          <span class="back-tooltiptext">Ataque</span>
          <span>${dataset["stats"]["base-attack"]}</span>
          <span class="back-greater-than-average-arrow" > ${dataset["statusAttackGreater"]} </span> 
          <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
          <span class="back-lower-than-average-arrow"> ${dataset["statusAttackLower"]} </span>
          <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
         
          <img class="back-stats-figures" alt="Escudo" src="images/shield.png">
          <span class="back-tooltiptext">Defesa</span>
          <span>${dataset["stats"]["base-defense"]}</span> 
          <span class="back-greater-than-average-arrow" > ${dataset["statusDefenseGreater"]} </span> 
          <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
          <span class="back-lower-than-average-arrow"> ${dataset["statusDefenseLower"]} </span> 
          <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
      
          <img class="back-stats-figures" alt="Energia" src="images/stamina.png">
          <span class="back-tooltiptext">Stamina</span>
          <span>${dataset["stats"]["base-stamina"]}</span> 
          <span class="back-greater-than-average-arrow" > ${dataset["statusStaminaGreater"]} </span>
          <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span> 
          <span class="back-lower-than-average-arrow"> ${dataset["statusStaminaLower"]}</span> 
          <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
        
          <br>

          <img  class="back-stats-figures" alt="Combate" src="images/vs.jpg">
          <span class="back-tooltiptext">Poder de Combate</span>
          <span>${dataset["stats"]["max-cp"]}</span> 
          <span class="back-greater-than-average-arrow"> ${dataset["statusMaxCpGreater"]}</span> 
          <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
          <span class="back-lower-than-average-arrow"> ${dataset["statusMaxCpLower"]} </span> 
          <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
        
          <img class="back-stats-figures" alt="Vida" src="images/heart.jpg">
          <span class="back-tooltiptext">Pontos de Vida</span>
          <span>${dataset["stats"]["max-hp"]}</span> 
          <span class="back-greater-than-average-arrow"> ${dataset["statusMaxHpGreater"]} </span> 
          <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
          <span class="back-lower-than-average-arrow" > ${dataset["statusMaxHpLower"]} </span> 
          <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
        </div>

        <div class="back-resistant-to">
          <p class="back-card-titles"> Resistente à </p>
          <p class="pokemon-resistance" value= R${dataset["resistant"][0]}>${dataset["PTPokemonResistant"][0]} </p> 
          <span class="tooltiptext">${dataset["pokemonResistantInitials"][0]}</span>
          <p class="pokemon-resistance" value= R${dataset["resistant"][1]}>${dataset["PTPokemonResistant"][1]} </p> 
          <span class="tooltiptext">${dataset["pokemonResistantInitials"][1]}</span>
          <p class="pokemon-resistance" value= R${dataset["resistant"][2]}>${dataset["PTPokemonResistant"][2]} </p> 
          <span class="tooltiptext">${dataset["pokemonResistantInitials"][2]}</span>
          <p class="pokemon-resistance" value= R${dataset["resistant"][3]}>${dataset["PTPokemonResistant"][3]} </p> 
          <span class="tooltiptext">${dataset["pokemonResistantInitials"][3]}</span>
          <p class="pokemon-resistance" value= R${dataset["resistant"][4]}>${dataset["PTPokemonResistant"][4]} </p> 
          <span class="tooltiptext">${dataset["pokemonResistantInitials"][4]}</span>
          <p class="pokemon-resistance" value= R${dataset["resistant"][5]}>${dataset["PTPokemonResistant"][5]} </p> 
          <span class="tooltiptext">${dataset["pokemonResistantInitials"][5]}</span>
          <p class="pokemon-resistance" value= R${dataset["resistant"][6]}>${dataset["PTPokemonResistant"][6]} </p> 
          <span class="tooltiptext">${dataset["pokemonResistantInitials"][6]}</span>
        </div>
        <div class="back-weak-to">
          <p class="back-card-titles"> Fraco contra</p>
          <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][0]}>${dataset["PTPokemonWeaknesses"][0]} </p> 
          <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][0]}</span>
          <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][1]}>${dataset["PTPokemonWeaknesses"][1]} </p> 
          <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][1]}</span>
          <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][2]}>${dataset["PTPokemonWeaknesses"][2]} </p> 
          <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][2]}</span>
          <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][3]}>${dataset["PTPokemonWeaknesses"][3]} </p> 
          <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][3]}</span>
          <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][4]}>${dataset["PTPokemonWeaknesses"][4]} </p> 
          <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][4]}</span>
          <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][5]}>${dataset["PTPokemonWeaknesses"][5]} </p> 
          <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][5]}</span>
          <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][6]}>${dataset["PTPokemonWeaknesses"][6]} </p> 
          <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][6]}</span>
        
          </div>
          <p class="back-pokemon-generation"> Geração ${dataset["generation"]["num"]}  </p>
        </li>
    </div> 
  </div>      `
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
    functionGenerationResult = filterData(pokemon, ["generation"],["num"], generationButton);
    listPokemonsByGeneration(functionGenerationResult);
    filterNames();
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

//2. Impressão da lista de pokemons completa:
listPokemons(pokemon)

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
    functionTypeResult1 = filterData(pokemon, ["type"],[0], typeButton);
    functionTypeResult2 = filterData(pokemon, ["type"],[1], typeButton);
    functionTypeResultMerged = functionTypeResult1.concat(functionTypeResult2)
    listPokemons(functionTypeResultMerged)
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
    <div class="card">

    <div class="front-card front-card-spawn-chance"> 
      <li class="front-list"> 
        <img class="front-pokemon-image" alt="${dataset.name}" src="https://pokeres.bastionbot.org/images/pokemon/${dataset.num2}.png">
        <p class="front-pokemon-id">#${dataset["num"]} </p> 
        <p class="front-pokemon-name"> ${dataset["name"]} </p> 
        <p class="front-pokemon-type" value= ${dataset["type"][0]}> ${dataset["type2"][0]} </p> 
        <p class="front-pokemon-type" value= ${dataset["type"][1]}> ${dataset["type2"][1]} </p> 
        <p id="resistant-to"> Resistente à </p>
        <div class="front-pokemon-resistance">
          <p class="pokemon-resistance" value= R${dataset["resistant"][0]}>${dataset["PTPokemonResistant"][0]} </p> 
          <span class="tooltiptext">${dataset["pokemonResistantInitials"][0]}</span>
          <p class="pokemon-resistance" value= R${dataset["resistant"][1]}>${dataset["PTPokemonResistant"][1]} </p> 
          <span class="tooltiptext">${dataset["pokemonResistantInitials"][1]}</span>
          <p class="pokemon-resistance" value= R${dataset["resistant"][2]}>${dataset["PTPokemonResistant"][2]} </p> 
          <span class="tooltiptext">${dataset["pokemonResistantInitials"][2]}</span>
          <p class="pokemon-resistance" value= R${dataset["resistant"][3]}>${dataset["PTPokemonResistant"][3]} </p> 
          <span class="tooltiptext">${dataset["pokemonResistantInitials"][3]}</span>
          <p class="pokemon-resistance" value= R${dataset["resistant"][4]}>${dataset["PTPokemonResistant"][4]} </p> 
          <span class="tooltiptext">${dataset["pokemonResistantInitials"][4]}</span>
          <p class="pokemon-resistance" value= R${dataset["resistant"][5]}>${dataset["PTPokemonResistant"][5]} </p> 
          <span class="tooltiptext">${dataset["pokemonResistantInitials"][5]}</span>
          <p class="pokemon-resistance" value= R${dataset["resistant"][6]}>${dataset["PTPokemonResistant"][6]} </p> 
          <span class="tooltiptext">${dataset["pokemonResistantInitials"][6]}</span>
        </div>
        </li>
    </div> 

    <div class="back-card"> 
    <li class="back-list">  

      <div class="back-pokemon-size">
        <h1 class="back-card-titles"> Tamanho do Pokemon </h1>
        <img class="back-size-figures" alt="Peso" src="images/weigth.svg">
        <span class="back-tooltiptext">Peso </span>
        <span>${dataset["size"]["weight"]}</span> 
        <img class="back-size-figures" alt="Altura" src="images/heigth.jpg">
        <span class="back-tooltiptext">Altura</span>
        <span>${dataset["size"]["height"]}</span> 
      </div>

      <div class="back-pokemon-stats">
        <h1 class="back-card-titles"> Estatísticas</h1>

        <img class="back-stats-figures" alt="Ataque" src="images/sword.png">
        <span class="back-tooltiptext">Ataque</span>
        <span>${dataset["stats"]["base-attack"]}</span>
        <span class="back-greater-than-average-arrow" > ${dataset["statusAttackGreater"]} </span> 
        <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
        <span class="back-lower-than-average-arrow"> ${dataset["statusAttackLower"]} </span>
        <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
       
        <img class="back-stats-figures" alt="Escudo" src="images/shield.png">
        <span class="back-tooltiptext">Defesa</span>
        <span>${dataset["stats"]["base-defense"]}</span> 
        <span class="back-greater-than-average-arrow" > ${dataset["statusDefenseGreater"]} </span> 
        <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
        <span class="back-lower-than-average-arrow"> ${dataset["statusDefenseLower"]} </span> 
        <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
    
        <img class="back-stats-figures" alt="Energia" src="images/stamina.png">
        <span class="back-tooltiptext">Stamina</span>
        <span>${dataset["stats"]["base-stamina"]}</span> 
        <span class="back-greater-than-average-arrow" > ${dataset["statusStaminaGreater"]} </span>
        <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span> 
        <span class="back-lower-than-average-arrow"> ${dataset["statusStaminaLower"]}</span> 
        <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
      
        <br>

        <img  class="back-stats-figures" alt="Combate" src="images/vs.jpg">
        <span class="back-tooltiptext">Poder de Combate</span>
        <span>${dataset["stats"]["max-cp"]}</span> 
        <span class="back-greater-than-average-arrow"> ${dataset["statusMaxCpGreater"]}</span> 
        <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
        <span class="back-lower-than-average-arrow"> ${dataset["statusMaxCpLower"]} </span> 
        <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
      
        <img class="back-stats-figures" alt="Vida" src="images/heart.jpg">
        <span class="back-tooltiptext">Pontos de Vida</span>
        <span>${dataset["stats"]["max-hp"]}</span> 
        <span class="back-greater-than-average-arrow"> ${dataset["statusMaxHpGreater"]} </span> 
        <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
        <span class="back-lower-than-average-arrow" > ${dataset["statusMaxHpLower"]} </span> 
        <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
      </div>

      <div class="back-resistant-to">
        <p class="back-card-titles"> Resistente à </p>
        <p class="pokemon-resistance" value= R${dataset["resistant"][0]}>${dataset["PTPokemonResistant"][0]} </p> 
        <span class="tooltiptext">${dataset["pokemonResistantInitials"][0]}</span>
        <p class="pokemon-resistance" value= R${dataset["resistant"][1]}>${dataset["PTPokemonResistant"][1]} </p> 
        <span class="tooltiptext">${dataset["pokemonResistantInitials"][1]}</span>
        <p class="pokemon-resistance" value= R${dataset["resistant"][2]}>${dataset["PTPokemonResistant"][2]} </p> 
        <span class="tooltiptext">${dataset["pokemonResistantInitials"][2]}</span>
        <p class="pokemon-resistance" value= R${dataset["resistant"][3]}>${dataset["PTPokemonResistant"][3]} </p> 
        <span class="tooltiptext">${dataset["pokemonResistantInitials"][3]}</span>
        <p class="pokemon-resistance" value= R${dataset["resistant"][4]}>${dataset["PTPokemonResistant"][4]} </p> 
        <span class="tooltiptext">${dataset["pokemonResistantInitials"][4]}</span>
        <p class="pokemon-resistance" value= R${dataset["resistant"][5]}>${dataset["PTPokemonResistant"][5]} </p> 
        <span class="tooltiptext">${dataset["pokemonResistantInitials"][5]}</span>
        <p class="pokemon-resistance" value= R${dataset["resistant"][6]}>${dataset["PTPokemonResistant"][6]} </p> 
        <span class="tooltiptext">${dataset["pokemonResistantInitials"][6]}</span>
      </div>
      <div class="back-weak-to">
        <p class="back-card-titles"> Fraco contra</p>
        <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][0]}>${dataset["PTPokemonWeaknesses"][0]} </p> 
        <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][0]}</span>
        <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][1]}>${dataset["PTPokemonWeaknesses"][1]} </p> 
        <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][1]}</span>
        <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][2]}>${dataset["PTPokemonWeaknesses"][2]} </p> 
        <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][2]}</span>
        <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][3]}>${dataset["PTPokemonWeaknesses"][3]} </p> 
        <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][3]}</span>
        <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][4]}>${dataset["PTPokemonWeaknesses"][4]} </p> 
        <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][4]}</span>
        <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][5]}>${dataset["PTPokemonWeaknesses"][5]} </p> 
        <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][5]}</span>
        <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][6]}>${dataset["PTPokemonWeaknesses"][6]} </p> 
        <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][6]}</span>
      
        </div>
        <p class="back-pokemon-generation"> Geração ${dataset["generation"]["num"]}  </p>
      </li>
  </div> 
</div>  

    `
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
    functionResistanceResult1 = filterData(pokemon, ["resistant"],[0], resistanceButton);
    functionResistanceResult2 = filterData(pokemon, ["resistant"],[1], resistanceButton);
    functionResistanceResult3 = filterData(pokemon, ["resistant"],[2], resistanceButton);
    functionResistanceResult4 = filterData(pokemon, ["resistant"],[3], resistanceButton);
    functionResistanceResult5 = filterData(pokemon, ["resistant"],[4], resistanceButton);
    functionResistanceResult6 = filterData(pokemon, ["resistant"],[5], resistanceButton);
    functionResistanceResult7 = filterData(pokemon, ["resistant"],[6], resistanceButton);
  
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
  <div class="card">

  <div class="front-card front-card-spawn-chance"> 
    <li class="front-list"> 
      <img class="front-pokemon-image" alt="${dataset.name}" src="https://pokeres.bastionbot.org/images/pokemon/${dataset.num2}.png">
      <p class="front-pokemon-id">#${dataset["num"]} </p> 
      <p class="front-pokemon-name"> ${dataset["name"]} </p> 
      <p class="front-pokemon-type" value= ${dataset["type"][0]}> ${dataset["type2"][0]} </p> 
      <p class="front-pokemon-type" value= ${dataset["type"][1]}> ${dataset["type2"][1]} </p> 
      <div class="front-pokemon-weaknesses">
      <p id="weak-to"> Fraco contra</p>
      <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][0]}>${dataset["PTPokemonWeaknesses"][0]} </p> 
      <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][0]}</span>
      <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][1]}>${dataset["PTPokemonWeaknesses"][1]} </p> 
      <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][1]}</span>
      <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][2]}>${dataset["PTPokemonWeaknesses"][2]} </p> 
      <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][2]}</span>
      <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][3]}>${dataset["PTPokemonWeaknesses"][3]} </p> 
      <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][3]}</span>
      <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][4]}>${dataset["PTPokemonWeaknesses"][4]} </p> 
      <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][4]}</span>
      <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][5]}>${dataset["PTPokemonWeaknesses"][5]} </p> 
      <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][5]}</span>
      <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][6]}>${dataset["PTPokemonWeaknesses"][6]} </p> 
      <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][6]}</span>
      </div>
      </li>
  </div> 

  <div class="back-card"> 
  <li class="back-list">  

    <div class="back-pokemon-size">
      <h1 class="back-card-titles"> Tamanho do Pokemon </h1>
      <img class="back-size-figures" alt="Peso" src="images/weigth.svg">
      <span class="back-tooltiptext">Peso </span>
      <span>${dataset["size"]["weight"]}</span> 
      <img class="back-size-figures" alt="Altura" src="images/heigth.jpg">
      <span class="back-tooltiptext">Altura</span>
      <span>${dataset["size"]["height"]}</span> 
    </div>

    <div class="back-pokemon-stats">
      <h1 class="back-card-titles"> Estatísticas</h1>

      <img class="back-stats-figures" alt="Ataque" src="images/sword.png">
      <span class="back-tooltiptext">Ataque</span>
      <span>${dataset["stats"]["base-attack"]}</span>
      <span class="back-greater-than-average-arrow" > ${dataset["statusAttackGreater"]} </span> 
      <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
      <span class="back-lower-than-average-arrow"> ${dataset["statusAttackLower"]} </span>
      <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
     
      <img class="back-stats-figures" alt="Escudo" src="images/shield.png">
      <span class="back-tooltiptext">Defesa</span>
      <span>${dataset["stats"]["base-defense"]}</span> 
      <span class="back-greater-than-average-arrow" > ${dataset["statusDefenseGreater"]} </span> 
      <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
      <span class="back-lower-than-average-arrow"> ${dataset["statusDefenseLower"]} </span> 
      <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
  
      <img class="back-stats-figures" alt="Energia" src="images/stamina.png">
      <span class="back-tooltiptext">Stamina</span>
      <span>${dataset["stats"]["base-stamina"]}</span> 
      <span class="back-greater-than-average-arrow" > ${dataset["statusStaminaGreater"]} </span>
      <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span> 
      <span class="back-lower-than-average-arrow"> ${dataset["statusStaminaLower"]}</span> 
      <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
    
      <br>

      <img  class="back-stats-figures" alt="Combate" src="images/vs.jpg">
      <span class="back-tooltiptext">Poder de Combate</span>
      <span>${dataset["stats"]["max-cp"]}</span> 
      <span class="back-greater-than-average-arrow"> ${dataset["statusMaxCpGreater"]}</span> 
      <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
      <span class="back-lower-than-average-arrow"> ${dataset["statusMaxCpLower"]} </span> 
      <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
    
      <img class="back-stats-figures" alt="Vida" src="images/heart.jpg">
      <span class="back-tooltiptext">Pontos de Vida</span>
      <span>${dataset["stats"]["max-hp"]}</span> 
      <span class="back-greater-than-average-arrow"> ${dataset["statusMaxHpGreater"]} </span> 
      <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
      <span class="back-lower-than-average-arrow" > ${dataset["statusMaxHpLower"]} </span> 
      <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
    </div>

    <div class="back-resistant-to">
      <p class="back-card-titles"> Resistente à </p>
      <p class="pokemon-resistance" value= R${dataset["resistant"][0]}>${dataset["PTPokemonResistant"][0]} </p> 
      <span class="tooltiptext">${dataset["pokemonResistantInitials"][0]}</span>
      <p class="pokemon-resistance" value= R${dataset["resistant"][1]}>${dataset["PTPokemonResistant"][1]} </p> 
      <span class="tooltiptext">${dataset["pokemonResistantInitials"][1]}</span>
      <p class="pokemon-resistance" value= R${dataset["resistant"][2]}>${dataset["PTPokemonResistant"][2]} </p> 
      <span class="tooltiptext">${dataset["pokemonResistantInitials"][2]}</span>
      <p class="pokemon-resistance" value= R${dataset["resistant"][3]}>${dataset["PTPokemonResistant"][3]} </p> 
      <span class="tooltiptext">${dataset["pokemonResistantInitials"][3]}</span>
      <p class="pokemon-resistance" value= R${dataset["resistant"][4]}>${dataset["PTPokemonResistant"][4]} </p> 
      <span class="tooltiptext">${dataset["pokemonResistantInitials"][4]}</span>
      <p class="pokemon-resistance" value= R${dataset["resistant"][5]}>${dataset["PTPokemonResistant"][5]} </p> 
      <span class="tooltiptext">${dataset["pokemonResistantInitials"][5]}</span>
      <p class="pokemon-resistance" value= R${dataset["resistant"][6]}>${dataset["PTPokemonResistant"][6]} </p> 
      <span class="tooltiptext">${dataset["pokemonResistantInitials"][6]}</span>
    </div>
    <div class="back-weak-to">
      <p class="back-card-titles"> Fraco contra</p>
      <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][0]}>${dataset["PTPokemonWeaknesses"][0]} </p> 
      <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][0]}</span>
      <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][1]}>${dataset["PTPokemonWeaknesses"][1]} </p> 
      <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][1]}</span>
      <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][2]}>${dataset["PTPokemonWeaknesses"][2]} </p> 
      <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][2]}</span>
      <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][3]}>${dataset["PTPokemonWeaknesses"][3]} </p> 
      <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][3]}</span>
      <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][4]}>${dataset["PTPokemonWeaknesses"][4]} </p> 
      <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][4]}</span>
      <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][5]}>${dataset["PTPokemonWeaknesses"][5]} </p> 
      <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][5]}</span>
      <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][6]}>${dataset["PTPokemonWeaknesses"][6]} </p> 
      <span class="tooltiptext">${dataset["pokemonWeaknessesInitials"][6]}</span>
    
      </div>
      <p class="back-pokemon-generation"> Geração ${dataset["generation"]["num"]}  </p>
    </li>
</div> 
</div>  
`
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
  functionWeaknessesResult1 = filterData(pokemon, ["weaknesses"],[0], WeaknessesButton);
  functionWeaknessesResult2 = filterData(pokemon, ["weaknesses"],[1], WeaknessesButton);
  functionWeaknessesResult3 = filterData(pokemon, ["weaknesses"],[2], WeaknessesButton);
  functionWeaknessesResult4 = filterData(pokemon, ["weaknesses"],[3], WeaknessesButton);
  functionWeaknessesResult5 = filterData(pokemon, ["weaknesses"],[4], WeaknessesButton);
  functionWeaknessesResult6 = filterData(pokemon, ["weaknesses"],[5], WeaknessesButton);
  functionWeaknessesResult7 = filterData(pokemon, ["weaknesses"],[6], WeaknessesButton);

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



listPokemons(pokemon)
