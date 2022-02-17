const pokedex = document.getElementById("pokedex");
const inputSearch = document.getElementById("txtsearch");
console.log(inputSearch);
const fetchPokemon = () => {
    const promises = [];
    for( let i = 1; i < 151; i++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(promises).then( results => {
        const pokemon = results.map( (data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            stats_name: data.stats.map((stat) => stat.stat.name).join('<br><br>'),
            stats: data.stats.map((stat) => stat.base_stat).join('<br><br>'),
            type: data.types.map((type) => type.type.name).join(' - ')
        }));
        displayPokemon(pokemon);
    });  
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map ( pokeman => 
        `
    <div class='container'>
        <div class='carta'>
            <div class='pokemon_carta_frente'>
                <img src="${pokeman.image}"/>
                <div class='pokemon_atributos'>
                    <h2><br>${pokeman.id}. ${pokeman.name.toUpperCase()}</h2>
                    <p><br>${pokeman.type.toUpperCase()}</p>
                </div>
            </div>
            <div class='pokemon_carta_tras'>
            <h2 id='stats_name'>${pokeman.stats_name}</h2>
            <h2 id='stats'>${pokeman.stats}</h2>
            </div>
        </div>
    </div>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
}

inputSearch.addEventListener('input', event => {
    const inputValue = event.target.value.trim()
    Array.from(pokedex.children)
        .filter(todo => !todo.textContent.includes(inputValue.toUpperCase()))
        .forEach(todo => {
            todo.classList.add('hidden')
        })
    Array.from(pokedex.children)
        .filter(todo => todo.textContent.includes(inputValue.toUpperCase()))
        .forEach(todo => {
            todo.classList.remove('hidden')
        })    
})

fetchPokemon();