import React, { useEffect, useState } from 'react';
import Pokemon from './Pokemon';
import { extractPokemon } from '../helpers/PokemonListHelpers';
import { pokemonStore } from '../Store/pokemon-reducer/pokemon-reducer';
import * as pokemonActions from '../Store/pokemon-reducer/pokemon-actions';
import PaginationBar from './PaginationBar';
import ErrorPage from './Error';

const axios = require('axios');
const LIMIT = 150;

export default function PokemonList() {
  const [evolutionChain, setEvolution] = useState({});
  const [page, setPage] = useState(1);
  const [pokeData, setPokeData] = useState([]);
  const hasError = false;

  let initialLoad = true;

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`)
      .then(res => {
        return extractPokemon(res.data.results, setPokemon, setEvolution, LIMIT);
      })
      .catch(() => hasError = true);
  }, []);

  const setPokemon = pokemons => {
    pokemonStore.dispatch(pokemonActions.setPokemon(pokemons))
  }

  const handleStoreChanges = () => {
    const { pageNumber, pokemon } = pokemonStore.getState();
    if (initialLoad) {
      setPokeData(pokemon);
      initialLoad = false;
    }
    togglePage(pageNumber);
  }

  const togglePage = (number) => {
    setPage(number);
  }

  pokemonStore.subscribe(handleStoreChanges);

  const pokemonData = pokeData?.map(pokemon => {
    return (
      <Pokemon
        key={pokemon?.id}
        id={pokemon?.id}
        name={pokemon?.name}
        height={pokemon?.height}
        weight={pokemon?.weight}
        sprite={pokemon?.sprite}
        types={pokemon?.types}
        page={page}
        evolvesTo={evolutionChain}
      />
    );
  });

  return (
    <div>
      {hasError && <ErrorPage />}
      {!hasError &&
        <div>
          {pokemonData}
          <PaginationBar />
        </div>
      }
    </div>
  );
}
