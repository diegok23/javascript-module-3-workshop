root = document.querySelector('#root');

const webFont = document.createElement('style');
webFont.innerText =
  "@import url('http://fonts.cdnfonts.com/css/pokemon-solid');\n@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');";
root.appendChild(webFont);

const title = document.createElement('div');
title.id = 'title';
root.appendChild(title);

const titleDex = document.createElement('div');
titleDex.id = 'titleDex';
titleDex.innerText = 'PokeDex';
title.appendChild(titleDex);

const titleOwner = document.createElement('div');
titleOwner.id = 'titleOwner';
titleOwner.innerText = 'by DiegoIK';
title.appendChild(titleOwner);

const divSearchBox = document.createElement('div');
divSearchBox.id = 'searchBox';
root.appendChild(divSearchBox);

const mainBox = document.createElement('div');
mainBox.id = 'mainBox';

const searchText = document.createElement('input');
searchText.id = 'searchText';
divSearchBox.appendChild(searchText);

const searchButton = document.createElement('button');
searchButton.id = 'searchButton';
searchButton.innerText = 'Buscar';
searchButton.addEventListener('click', searchPokemon);
divSearchBox.appendChild(searchButton);


const statsDiv = document.createElement('div');
statsDiv.id = 'statsDiv';

const pokemonStat = document.createElement('p');
pokemonStat.id = 'pokemonStat';

let resultDiv = document.createElement('div');
resultDiv.id = 'result';
resultDiv.classList.add('hidden');
mainBox.appendChild(resultDiv);
mainBox.appendChild(statsDiv);

//---------------------------------
const capitalizeFirstLetter = ([first, ...rest], locale = navigator.language) => first.toLocaleUpperCase(locale) + rest.join('');

const pokemonName = document.createElement('p');
pokemonName.id = 'pokemonName';
resultDiv.appendChild(pokemonName);

const pokemonImg = document.createElement('img');
pokemonImg.id = 'pokemonImg';
resultDiv.appendChild(pokemonImg);

const pokemonTypes = document.createElement('div');
pokemonTypes.classList.add('pokemonTypes');
resultDiv.appendChild(pokemonTypes);

//---------------------------------
function searchPokemon() {
  const pokemonName = searchText.value;
  fetch('http://pokeapi.co/api/v2/pokemon/' + pokemonName)
    .then((res) => res.json())
    .then(paintPokemon)
    .catch(paintError);
    searchText.value = '';
}

function paintPokemon(pokemon) {
  root.appendChild(mainBox);
  pokemonTypes.innerText = '';
  pokemonImg.src = pokemon.sprites.other['official-artwork'].front_default;
  pokemonName.innerText = capitalizeFirstLetter(pokemon.name);
  pokemonStat.innerText = `Altura: ${pokemon.height * 10} cm`;
  statsDiv.appendChild(pokemonStat);
  pokemon.types;
  pokemon.types.forEach((type) => {
    pokemonTypes.appendChild(buildType(type.type.name));
  });
  resultDiv.classList.remove('hidden');
}

function paintError(reason) {
  resultDiv.classList.add('hidden');
}

function buildType(type) {
  const element = document.createElement('div');
  element.classList.add('type');
  element.classList.add(type.toLowerCase());
  element.innerHTML = capitalizeFirstLetter(type);
  mainBox.classList = '';
  mainBox.classList.add(type.toLowerCase());
  return element;
}
