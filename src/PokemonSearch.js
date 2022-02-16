import { useState } from 'react';
import PokemonList from './PokemonList';
import Spinner from './Spinner';

export default function PokemonSearch() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  
  async function handlePokemonSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`/.netlify/functions/pokemon?search=${search}`);
    const json = await response.json();
    setPokemon(json);
    setLoading(false);
  }

  return (
    <section className='pokemon'>
      <form onSubmit={handlePokemonSubmit}>
        <label>Search Pokemon</label>
        <input onChange={(e) => setSearch(e.target.value)}
          value={search}
          type='text' />
        <button>Get pokemon</button>
      </form>
      <PokemonList pokemon={pokemon} />
      {
        loading
          && <Spinner />
      }
    </section>
  );
}
