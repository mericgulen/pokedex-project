const bg_color = {
  grass: '#8BD369',
  fire: '#FF603F',
  water: '#3399FF',
  bug: '#AABB22',
  normal: '#AAAA99',
  flying: '#9AA8FA',
  poison: '#B76EA4',
  electric: '#FFD34E',
  ground: '#E2C56A',
  fairy: '#F1A8EC',
  psychic: '#FF6EA4',
  fighting: '#C56E5C',
  rock: '#C5B679',
  dragon: '#7766EE',
  ice: '#66CCFF',
};

const pokeContainer = document.querySelector('.poke-container');
const search = document.querySelector('.search');
const inputSearch = document.querySelector('.input-search');
const btnSearch = document.querySelector('.btn-search');

const countPokemon = 151;

inputSearch.addEventListener('input', e => {
  //* enter data into input to search
  const searchValue = inputSearch.value.toLowerCase();
  const pokeName = document.querySelectorAll('.poke-name');

  pokeName.forEach(pokename => {
    if (pokename.innerHTML.toLowerCase().includes(searchValue)) {
      pokename.parentElement.parentElement.style.display = 'block';
    } else {
      pokename.parentElement.parentElement.style.display = 'none';
    }
  });
});

//* show input search functionality by adding active class
const showInputSearch = () => {
  search.classList.toggle('active');
};
//* event listeners
btnSearch.addEventListener('click', showInputSearch);

//* pokemon

const getPokemon = async id => {
  //* https://pokeapi.co/ 
  const fetchUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const resp = await fetch(fetchUrl);
  //* json formatına getirmemiz lazım
  const data = await resp.json();
  console.log(data);
  createPokemonCard(data);
};

const fetchPokemon = async () => {
  for (let i = 1; i < countPokemon; i++) {
    await getPokemon(i);
  }
};

fetchPokemon();

const createPokemonCard = function (poke) {
  const pokemonDiv = document.createElement('div');
  pokemonDiv.className = 'pokemon';

  const pokeId = poke.id.toString().padStart(3, '0');
  const pokeType = poke.types[0].type.name;

  const pokeBackground = bg_color[pokeType];
  pokemonDiv.style.backgroundColor = `${pokeBackground}`;

  pokemonDiv.innerHTML = `
     <div class="img-container">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png"
        alt="First Pokemon"
      />
    </div>
    <div class="poke-info">
      <span class="poke-id">#${pokeId}</span>
      <h3 class="poke-name">${poke.name}</h3>
      <div class="small">
        <small class="poke-exp"
          ><i class="fa-solid fa-flask"></i>${poke.base_experience} exp</small
        >
        <small class="poke-weight"
          ><i class="fa-solid fa-weight-scale"></i> ${poke.weight} kg</small
        >
      </div>
      <div class="poke-type">
        <i class="fa-brands fa-uncharted"></i> ${pokeType}
      </div>
    </div>
   `;

  pokeContainer.appendChild(pokemonDiv);
};
