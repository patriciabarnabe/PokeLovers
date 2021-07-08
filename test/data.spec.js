///SEÇÃO 1: IMPORTAÇÃO DAS FUNÇÕES
import { filterData } from '../src/data.js';
import { advancedFilterData } from '../src/data.js';
import { sortData } from '../src/data.js';
import { computeAverage } from '../src/data.js';


describe('filterData', () => {
  it('filterData should be a function', () => {
    expect(typeof filterData).toBe('function');
})

  const pokemonData = [
    {name:"Pikachu", generation:{"num":"I", "name":"Kanto"}, type:["Electric"]},
    {name:"Charmander", generation:{"num":"I", "name":"Kanto"}, type:["Fire"]},
    {name:"Lugia", generation:{"num":"II", "name":"Johto"}, type:["Psychic", "Flying"]},
    {name:"Pidgeot", generation:{"num":"I", "name":"Kanto"}, type:["Normal", "Flying"]},
    {name:"Chikorita", generation:{"num":"II", "name":"Johto"}, type:["Grass"]}
]

  it('When filtering pokemon generation (II), it should return an object with {Lugia..., Chikorita}', () => {
    const pokemonFilterData = filterData(pokemonData, ["generation"], ["num"], "II");
    expect(pokemonFilterData).toStrictEqual([{name:"Lugia", generation:{"num":"II", "name":"Johto"}, type:["Psychic", "Flying"]},
    {name:"Chikorita", generation:{"num":"II", "name":"Johto"}, type:["Grass"]} ]);
  });

  it('When filtering pokemon type, it should return an object with {Lugia..., Pidgeot}', () => {
    const pokemonFilterData = filterData(pokemonData, ["type"], "", "Flying");
    expect(pokemonFilterData).toStrictEqual([{name:"Lugia", generation:{"num":"II", "name":"Johto"}, type:["Psychic", "Flying",]},
    {name:"Pidgeot", generation:{"num":"I", "name":"Kanto"}, type:["Normal", "Flying"]}
  ]);
  });

});

describe('sortData', () => {
  it('sortData should be a function', () => {
    expect(typeof sortData).toBe('function');
  });


 it('When to sort in ascending order (names) Abra and Zubat, it should show Abra first', () => {
   const pokemonNames = [{name:"Abra"}, {name:"Zubat"}];
   const pokemonNamesSorted = sortData(pokemonNames, "", "name", "ascending");
   expect(pokemonNamesSorted[0].name).toBe("Abra");
  });

  it('When to sort in descending order (names) Abra and Zubat, it should show Zubat first.', () => {
    const pokemonNames = [{name:"Abra"}, {name:"Zubat"}];
    const pokemonNamesSorted = sortData(pokemonNames, "","name", "descending");
    expect(pokemonNamesSorted[0].name).toBe("Zubat");
   });

   //Comparação entre L e N, N > L. Então ocorre a necessidade de "girar";
   it('When to sort in ascending order (rarity-order) First and Third, it should show First first.', () => {
    const pokemonRarity= [{pokemonR:"First"}, {pokemonR:"Third"}];
    const pokemonRaritySorted = sortData(pokemonRarity, "","rarity-order", "ascending");
    expect(pokemonRaritySorted[0].pokemonR).toBe("First");
   });
 
   it('When to sort in descending order (rarity-order) First and Third, it should show Third first.', () => {
    const pokemonRarity= [{pokemonR:"First"}, {pokemonR:"Third"}];
    const pokemonRaritySorted = sortData(pokemonRarity, "","rarity-order", "descending");
    expect(pokemonRaritySorted[0].pokemonR).toBe("Third");
   });
  
   it('When to sort in ascending order (eggs distance) 02 Km and 05 Km, it should show 02 Km first.', () => {
    const pokemonEggsDistance = [{eggD:"02 Km"}, {eggD:"05 Km"}];
    const pokemonEggsDistanceSorted = sortData(pokemonEggsDistance, "","egg", "ascending");
    expect(pokemonEggsDistanceSorted[0].eggD).toBe("02 Km");
   });
 
   it('When to sort in descending order (eggs distance) 02 Km and 05 Km, it should show 05 Km first.', () => {
    const pokemonEggsDistance = [{eggD:"02 Km"}, {eggD:"05 Km"}];
    const pokemonEggsDistanceSorted = sortData(pokemonEggsDistance, "","egg", "descending");
    expect(pokemonEggsDistanceSorted[0].eggD).toBe("05 Km");
   });

  it('When to sort in ascending order (spawn-chance) 0% and 0.1%, it should show 0% first.', () => {
    const pokemonSpawnChance = [{name:"Pikachu", pokemonSC:0}, {name:"Charmander", pokemonSC:0.1}, {name:"Chikorita", pokemonSC:0.5}];
    const pokemonSpawnChanceSorted = sortData(pokemonSpawnChance, "","spawn-chance", "ascending");
    expect(pokemonSpawnChanceSorted[0].pokemonSC).toBe(0);
   });

  it('When to sort in descending order (spawn-chance) 0% and 0.1%, it should show 0.1% first.', () => {
    const pokemonSpawnChance = [{name:"Pikachu", pokemonSC:0}, {name:"Charmander", pokemonSC:0.1}, {name:"Chikorita", pokemonSC:0.5}];
    const pokemonSpawnChanceSorted = sortData(pokemonSpawnChance, "","spawn-chance", "descending");
    expect(pokemonSpawnChanceSorted[0].pokemonSC).toBe(0.5);
   });
 
  it('When to sort in ascending order (stats, base-attack) it should show Charmander first.',() => {
    const pokemonAttack = [
      {name:"Pikachu", stats:{"base-attack":122, "base-defense":96}},
      {name:"Charmander", stats:{"base-attack":116, "base-defense":93}},
      {name:"Pupitar", stats:{"base-attack":155, "base-defense":133}},
      {name:"Lugia", stats:{"base-attack":193, "base-defense":310}}
    ]
    const pokemonAttackSorted = sortData(pokemonAttack, ["stats"],["base-attack"], "ascending");
    expect(pokemonAttackSorted[0].name).toBe("Charmander");
  })

  it('When to sort in descending order (stats, base-attack) it should show Lugia first.',() => {
    const pokemonAttack = [
      {name:"Pikachu", stats:{"base-attack":122, "base-defense":96}},
      {name:"Charmander", stats:{"base-attack":116, "base-defense":93}},
      {name:"Pupitar", stats:{"base-attack":155, "base-defense":133}},
      {name:"Lugia", stats:{"base-attack":193, "base-defense":310}}
    ]
    const pokemonAttackSorted = sortData(pokemonAttack, ["stats"],["base-attack"], "descending");
    expect(pokemonAttackSorted[0].name).toBe("Lugia");
  })

  it('When to sort in ascending order (defense) it should show Charmander first.',() => {
    const pokemonAttack = [
      {name:"Pikachu", defense:96},
      {name:"Charmander", defense:93},
      {name:"Pupitar", defense:133},
      {name:"Lugia", defense:310}
    ]
    const pokemonAttackSorted = sortData(pokemonAttack, "","defense", "ascending");
    expect(pokemonAttackSorted[0].name).toBe("Charmander");
  })

  it('When to sort in descending order (defense) it should show Lugia first.',() => {
    const pokemonAttack = [
      {name:"Pikachu", defense:96},
      {name:"Charmander", defense:93},
      {name:"Pupitar", defense:133},
      {name:"Lugia", defense:310}
    ]
    const pokemonAttackSorted = sortData(pokemonAttack, "","defense", "descending");
    expect(pokemonAttackSorted[0].name).toBe("Lugia");
  })

  it('When to sort in ascending order (type[first]) it should show Charmander first.',() => {
    const pokemonType = [
      {name:"Pikachu", type:{"first":"water", "second":"ice"}},
      {name:"Charmander", type:{"first":"electric", "second":"steel"}},
      {name:"Pupitar", type:{"first":"grass", "second":"ground"}},
      {name:"Lugia", type:{"first":"ground", "second":"glass"}}
    ]
    const pokemonTypeSorted = sortData(pokemonType, ["type"],["first"], "ascending");
    expect(pokemonTypeSorted[0].name).toBe("Charmander");
  })

  it('When to sort in descending order (type[second]) it should show Charmander fisrt.',() => {
    const pokemonType = [
      {name:"Pikachu", type:{"first":"water", "second":"ice"}},
      {name:"Charmander", type:{"first":"electric", "second":"steel"}},
      {name:"Pupitar", type:{"first":"grass", "second":"ground"}},
      {name:"Lugia", type:{"first":"ground", "second":"glass"}}
    ]
    const pokemonTypeSorted = sortData(pokemonType, ["type"],["first"], "descending");
    expect(pokemonTypeSorted[0].name).toBe("Pikachu");
  })
});

describe('computeAverage', () => {
  it('computeAverage should be a function', () => {
    expect(typeof computeAverage).toBe('function');
  });

  const pokemonStats = [
    {name:"Pikachu", stats:{"base-attack":122, "base-defense":96}},
    {name:"Charmander", stats:{"base-attack":116, "base-defense":93}},
    {name:"Pupitar", stats:{"base-attack":155, "base-defense":133}},
    {name:"Lugia", stats:{"base-attack":193, "base-defense":310}}
  ]

  it('When computing average (base-attack), it should return (122+116+155+193)/4 = 146.5', () => {
    const pokemonStatsAverage = computeAverage(pokemonStats, ["stats"], ["base-attack"]);
    expect(pokemonStatsAverage).toBe(146.5);
  });

  it('When computing average (base-defense), it should return (96+93+133+310)/4 = 158', () => {
    const pokemonStatsAverage = computeAverage(pokemonStats, ["stats"], ["base-defense"]);
    expect(pokemonStatsAverage).toBe(158);
  });

  it('When computing average (base-defense), it should return (0.21+0.253+0+0)/4 = 0.11574999999999999', () => {
    const pokemonSpawnChance = [
      {name:"Pikachu", spawnChance:0.21},
      {name:"Charmander", spawnChance:0.253},
      {name:"Pupitar", spawnChance:0},
      {name:"Lugia", spawnChance:0}
    ]
    const pokeSpawnChanceAverage = computeAverage(pokemonSpawnChance, ["spawnChance"], "");
    expect(pokeSpawnChanceAverage).toBe(0.11574999999999999);
  });

});

describe('advancedFilterData', () => {
  it('advancedFilterData should be a function', () => {
    expect(typeof advancedFilterData).toBe('function');
  });
  const pokemonAdvancedFiltered = [
  {name:"Pikachu", generation:["I"], type:["steel", "electric"], resistant:["fire", "dragon", "electric"], weaknesses:["water", "ice"]},
  {name:"Charmander", generation:["I"], type:["fire", "dragon"], resistant:["fire", "dragon", "grass"], weaknesses:["water", "ice"]},
  {name:"Chikorita", generation:["II"], type:["ground", "grass"], resistant:["grass", "poison", "ground"], weaknesses:["electric", "fire"]},
  {name:"Sentret", generation:["I"], type:["ground", "electric"], resistant:["steel", "ground", "electric"], weaknesses:["water", "fairy"]},
  {name:"Blastoise", generation:["II"], type:["water", "ice"], resistant:["water", "ice", "fairy"], weaknesses:["fire", "dragon"]},
  {name:"Lugia", generation:["I"], type:["poison", "grass"], resistant:["ground", "water", "poison"], weaknesses:["fire", "pshychic"]},
  {name:"Crobat", generation:["I"], type:["ground", "electric"], resistant:["steel", "fire", "grass"], weaknesses:["water", "ice"]},
  {name:"Pichu", generation:["II"], type:["electric"], resistant:["electric", "steel", "grass"], weaknesses:["Flying"]},
  {name:"Togepi", generation:["I"], type:["fairy"], resistant:["fairy", "psychic", "grass"], weaknesses:["ground", "dark"]},
  {name:"Natu", generation:["II"], type:["fairy", "psychic"], resistant:["poison", "psychic", "fairy"], weaknesses:["grass", "normal"]},
  ];

  it('When advanced filtering pokemonAdvancedSorted on the condition 1.SSSS, it should return pokemonAttributes.', () => {
    const pokemonAdvancedFilteredSSSS = advancedFilterData(pokemonAdvancedFiltered, ["generation"], "All", ["type"], "All", ["resistant"], "All", ["weaknesses"], "All");
    expect(pokemonAdvancedFilteredSSSS).toEqual(pokemonAdvancedFiltered)
  });
  
  it('When advanced filtering pokemonAdvancedSorted on the condition 2.SSSN (only weaknesses value:ice"), it should return Pikachu, Charmander and Crobat.', () => {
    const pokemonAdvancedSortedSSSN = advancedFilterData(pokemonAdvancedFiltered, ["generation"], "All", ["type"], "All", ["resistant"], "All", ["weaknesses"], "ice");
    expect(pokemonAdvancedSortedSSSN).toEqual([
    {name:"Pikachu", generation:["I"], type:["steel", "electric"], resistant:["fire", "dragon", "electric"], weaknesses:["water", "ice"]},
    {name:"Charmander", generation:["I"], type:["fire", "dragon"], resistant:["fire", "dragon", "grass"], weaknesses:["water", "ice"]},
    {name:"Crobat", generation:["I"], type:["ground", "electric"], resistant:["steel", "fire", "grass"], weaknesses:["water", "ice"]} ]) 
  });

  it('When advanced filtering pokemonAdvancedSorted on the condition 3.SSNS (only resistant value:dragon), it should return Pikachu and Charmander.', () => {
    const pokemonAdvancedSortedSSSN = advancedFilterData(pokemonAdvancedFiltered, ["generation"], "All", ["type"], "All", ["resistant"], "dragon", ["weaknesses"], "All");
    expect(pokemonAdvancedSortedSSSN).toEqual([
    {name:"Pikachu", generation:["I"], type:["steel", "electric"], resistant:["fire", "dragon", "electric"], weaknesses:["water", "ice"]},
    {name:"Charmander", generation:["I"], type:["fire", "dragon"], resistant:["fire", "dragon", "grass"], weaknesses:["water", "ice"]} ]) 
  });

  it('When advanced filtering pokemonAdvancedSorted on the condition 4.SSNN (only resistant value:fire and weaknesses:water), it should return Pikachu, Charmander and Crobat.', () => {
    const pokemonAdvancedSortedSSSN = advancedFilterData(pokemonAdvancedFiltered, ["generation"], "All", ["type"], "All", ["resistant"], "fire", ["weaknesses"], "water");
    expect(pokemonAdvancedSortedSSSN).toEqual([
    {name:"Pikachu", generation:["I"], type:["steel", "electric"], resistant:["fire", "dragon", "electric"], weaknesses:["water", "ice"]},
    {name:"Charmander", generation:["I"], type:["fire", "dragon"], resistant:["fire", "dragon", "grass"], weaknesses:["water", "ice"]},
    {name:"Crobat", generation:["I"], type:["ground", "electric"], resistant:["steel", "fire", "grass"], weaknesses:["water", "ice"]}]) 
  });

  it('When advanced filtering pokemonAdvancedSorted on the condition 5.SNSS (only type value:fairy), it should return Togepi and Natu.', () => {
    const pokemonAdvancedSortedSSSN = advancedFilterData(pokemonAdvancedFiltered, ["generation"], "All", ["type"], "fairy", ["resistant"], "All", ["weaknesses"], "All");
    expect(pokemonAdvancedSortedSSSN).toEqual([
      {name:"Togepi", generation:["I"], type:["fairy"], resistant:["fairy", "psychic", "grass"], weaknesses:["ground", "dark"]},
      {name:"Natu", generation:["II"], type:["fairy", "psychic"], resistant:["poison", "psychic", "fairy"], weaknesses:["grass", "normal"]}]) 
  });

  it('When advanced filtering pokemonAdvancedSorted on the condition 6.SNSN (only type value:electric and weaknesses value:water), it should return Pikachu, Sentret and Crobat.', () => {
    const pokemonAdvancedSortedSSSN = advancedFilterData(pokemonAdvancedFiltered, ["generation"], "All", ["type"], "electric", ["resistant"], "All", ["weaknesses"], "water");
    expect(pokemonAdvancedSortedSSSN).toEqual([
      {name:"Pikachu", generation:["I"], type:["steel", "electric"], resistant:["fire", "dragon", "electric"], weaknesses:["water", "ice"]},
      {name:"Sentret", generation:["I"], type:["ground", "electric"], resistant:["steel", "ground", "electric"], weaknesses:["water", "fairy"]},
      {name:"Crobat", generation:["I"], type:["ground", "electric"], resistant:["steel", "fire", "grass"], weaknesses:["water", "ice"]} ]) 
  });

  it('When advanced filtering pokemonAdvancedSorted on the condition 7.SNNS (only type value:psychic and resistant value:poison), it should return Natu.', () => {
    const pokemonAdvancedSortedSSSN = advancedFilterData(pokemonAdvancedFiltered, ["generation"], "All", ["type"], "psychic", ["resistant"], "poison", ["weaknesses"], "All");
    expect(pokemonAdvancedSortedSSSN).toEqual([
      {name:"Natu", generation:["II"], type:["fairy", "psychic"], resistant:["poison", "psychic", "fairy"], weaknesses:["grass", "normal"]} ]) 
  });

  it('When advanced filtering pokemonAdvancedSorted on the condition 8.SNNN (only type value:grass, resistant value:poison and weaknesses value:fire), it should return Chikorita and Lugia.', () => {
    const pokemonAdvancedSortedSSSN = advancedFilterData(pokemonAdvancedFiltered, ["generation"], "All", ["type"], "grass", ["resistant"], "poison", ["weaknesses"], "fire");
    expect(pokemonAdvancedSortedSSSN).toEqual([
      {name:"Chikorita", generation:["II"], type:["ground", "grass"], resistant:["grass", "poison", "ground"], weaknesses:["electric", "fire"]},
      {name:"Lugia", generation:["I"], type:["poison", "grass"], resistant:["ground", "water", "poison"], weaknesses:["fire", "pshychic"]}]) 
  });

  it('When advanced filtering pokemonAdvancedSorted on the condition 9.NSSS (only generation value:I), it should return Pikachu, Charmander, Sentret, Lugia, Crobat, Togepi.', () => {
    const pokemonAdvancedSortedSSSN = advancedFilterData(pokemonAdvancedFiltered, ["generation"], "I", ["type"], "All", ["resistant"], "All", ["weaknesses"], "All");
    expect(pokemonAdvancedSortedSSSN).toEqual([
      {name:"Pikachu", generation:["I"], type:["steel", "electric"], resistant:["fire", "dragon", "electric"], weaknesses:["water", "ice"]},
      {name:"Charmander", generation:["I"], type:["fire", "dragon"], resistant:["fire", "dragon", "grass"], weaknesses:["water", "ice"]},
      {name:"Sentret", generation:["I"], type:["ground", "electric"], resistant:["steel", "ground", "electric"], weaknesses:["water", "fairy"]},
      {name:"Lugia", generation:["I"], type:["poison", "grass"], resistant:["ground", "water", "poison"], weaknesses:["fire", "pshychic"]},
      {name:"Crobat", generation:["I"], type:["ground", "electric"], resistant:["steel", "fire", "grass"], weaknesses:["water", "ice"]},
      {name:"Togepi", generation:["I"], type:["fairy"], resistant:["fairy", "psychic", "grass"], weaknesses:["ground", "dark"]}]) 
  });

  it('When advanced filtering pokemonAdvancedSorted on the condition 10.NSSN (only generation value:I and weaknesses:ice), it should return Pikachu, Charmander and Crobat.', () => {
    const pokemonAdvancedSortedSSSN = advancedFilterData(pokemonAdvancedFiltered, ["generation"], "I", ["type"], "All", ["resistant"], "All", ["weaknesses"], "ice");
    expect(pokemonAdvancedSortedSSSN).toEqual([
      {name:"Pikachu", generation:["I"], type:["steel", "electric"], resistant:["fire", "dragon", "electric"], weaknesses:["water", "ice"]},
      {name:"Charmander", generation:["I"], type:["fire", "dragon"], resistant:["fire", "dragon", "grass"], weaknesses:["water", "ice"]},
      {name:"Crobat", generation:["I"], type:["ground", "electric"], resistant:["steel", "fire", "grass"], weaknesses:["water", "ice"]}]) 
  });

  it('When advanced filtering pokemonAdvancedSorted on the condition 11.NSNS (only generation value:II and resistant:grass), it should return Chikorita and Pichu.', () => {
    const pokemonAdvancedSortedSSSN = advancedFilterData(pokemonAdvancedFiltered, ["generation"], "II", ["type"], "All", ["resistant"], "grass", ["weaknesses"], "All");
    expect(pokemonAdvancedSortedSSSN).toEqual([
      {name:"Chikorita", generation:["II"], type:["ground", "grass"], resistant:["grass", "poison", "ground"], weaknesses:["electric", "fire"]},
      {name:"Pichu", generation:["II"], type:["electric"], resistant:["electric", "steel", "grass"], weaknesses:["Flying"]}]) 
  });

  it('When advanced filtering pokemonAdvancedSorted on the condition 12.NSNN (only generation value:II, resistant:grass and weaknesses value:fire), it should return Chikorita.', () => {
    const pokemonAdvancedSortedSSSN = advancedFilterData(pokemonAdvancedFiltered, ["generation"], "II", ["type"], "All", ["resistant"], "grass", ["weaknesses"], "fire");
    expect(pokemonAdvancedSortedSSSN).toEqual([
      {name:"Chikorita", generation:["II"], type:["ground", "grass"], resistant:["grass", "poison", "ground"], weaknesses:["electric", "fire"]}]) 
  });

  it('When advanced filtering pokemonAdvancedSorted on the condition 13.NNSS (only generation value:I and type:electric), it should return Pikachu, Sentret, Crobat.', () => {
    const pokemonAdvancedSortedSSSN = advancedFilterData(pokemonAdvancedFiltered, ["generation"], "I", ["type"], "electric", ["resistant"], "All", ["weaknesses"], "All");
    expect(pokemonAdvancedSortedSSSN).toEqual([
      {name:"Pikachu", generation:["I"], type:["steel", "electric"], resistant:["fire", "dragon", "electric"], weaknesses:["water", "ice"]},
      {name:"Sentret", generation:["I"], type:["ground", "electric"], resistant:["steel", "ground", "electric"], weaknesses:["water", "fairy"]},
      {name:"Crobat", generation:["I"], type:["ground", "electric"], resistant:["steel", "fire", "grass"], weaknesses:["water", "ice"]}]) 
  });

  it('When advanced filtering pokemonAdvancedSorted on the condition 14.NNSN (only generation value:I, type:electric and weaknesses:ice), it should return Pikachu and Crobat.', () => {
    const pokemonAdvancedSortedSSSN = advancedFilterData(pokemonAdvancedFiltered, ["generation"], "I", ["type"], "electric", ["resistant"], "All", ["weaknesses"], "ice");
    expect(pokemonAdvancedSortedSSSN).toEqual([
      {name:"Pikachu", generation:["I"], type:["steel", "electric"], resistant:["fire", "dragon", "electric"], weaknesses:["water", "ice"]},
      {name:"Crobat", generation:["I"], type:["ground", "electric"], resistant:["steel", "fire", "grass"], weaknesses:["water", "ice"]}]) 
  });

  it('When advanced filtering pokemonAdvancedSorted on the condition 15.NNNS (only generation value:I, type:electric and resistant:fire), it should return Pikachu and Crobat.', () => {
    const pokemonAdvancedSortedSSSN = advancedFilterData(pokemonAdvancedFiltered, ["generation"], "I", ["type"], "electric", ["resistant"], "fire", ["weaknesses"], "All");
    expect(pokemonAdvancedSortedSSSN).toEqual([
      {name:"Pikachu", generation:["I"], type:["steel", "electric"], resistant:["fire", "dragon", "electric"], weaknesses:["water", "ice"]},
      {name:"Crobat", generation:["I"], type:["ground", "electric"], resistant:["steel", "fire", "grass"], weaknesses:["water", "ice"]}]) 
  });

  it('When advanced filtering pokemonAdvancedSorted on the condition 16.NNNN (only generation value:I, type:ground, resistant:fire, weaknesses value:ice), it should return only Crobat.', () => {
    const pokemonAdvancedSortedSSSN = advancedFilterData(pokemonAdvancedFiltered, ["generation"], "I", ["type"], "ground", ["resistant"], "fire", ["weaknesses"], "ice");
    expect(pokemonAdvancedSortedSSSN).toEqual([
      {name:"Crobat", generation:["I"], type:["ground", "electric"], resistant:["steel", "fire", "grass"], weaknesses:["water", "ice"]}]) 
  });
})

/*Conditions for the advancedFilterData: Os filtros são capazes de filtrar de acordo com outras caracteríticas e também, apenas algumas caracteriticas.
Nestas condições, nos casos em que o valor selecinado para filtro de algum atributo é todos, a função filter não irá passar por este atributo.
Desta forma temos 16 condições, das quais os filtros passam por todas os atributos até aquelas em que os filtros são dispensados. A árvore de decisão (a qual
contém as 16 possibilidades é descrita a seguir:
1) SSSS: Para os 4 atributos, respectivamente, o valor = All (todos), desta forma, o filtro é dispensado;
2) SSSN: Para os 3 primeiros atributos o valor selecionado foi todos, então o filtro irá filtrar apenas de acordo com o 4° atributo;
3) SSNS: Para os 2 primeiros atributos + último o valor selecionado foi todos, então o filtro irá filtrar apenas de acordo com o 3° atributo;
4) SSNN: Filtra apenas 3° e 4° atributo;
5) SNSS: Filtra apenas 2° atributo;
6) SNSN: Filtra apenas 2° e 4° atributo; 
7) SNNS: Filtra apenas 2° e 3° atributo;
8) SNNN: Filtra apenas 2°, 3° e 4° atributo;
9) NSSS: Filtra apenas 1°atributo;
10) NSSN: Filtra apenas 1° e 4° atributo;
11) NSNS: Filtra apenas 1° e 3° atributo; 
12) NSNN: Filtra apenas 1°, 3° e 4° atributo; 
13) NNSS: Filtra apenas 1° e 2° atributo; 
14) NNSN: Filtra apenas 1°, 2° e 4° atributo; 
15) NNNS: Filtra apenas 1°, 2° e 3° atributo; 
16) NNNN: Filtra TODOS os atributos.
*/