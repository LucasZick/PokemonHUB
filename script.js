const fetchPokemon = () => {
    const url = `https://pokeapi.co/api/v2/pokemon/1`;
    fetch(url)
        .then(res => {
            return res.json();
        })
        .then ((data) => {
            console.log(data)
            const pokemon = {};
            pokemon['name'] = data.name;
            pokemon['id'] = data.id;
            pokemon['image'] = data.sprites['front_default']
            console.log(pokemon);
        });
}

fetchPokemon();