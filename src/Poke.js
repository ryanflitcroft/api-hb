import React from 'react';

export default function Poke({ poke }) {
  return (
    <>
      <figure>
        <img src={poke.url_image} 
          alt={poke.pokemon} />
        <figcaption>{poke.pokemon}</figcaption>
      </figure>
    </>
  );
}
