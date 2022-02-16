import React from 'react';
import Poke from './Poke';

export default function PokemonList({ pokemon }) {
  return (
    <div>
      {pokemon.map((poke, i) =>
        <Poke key={poke + i}
          poke={poke} />
      )}
    </div>
  );
}
