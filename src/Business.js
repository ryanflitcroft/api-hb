import React from 'react';

export default function Business({ business }) {
  return (
    <>
      <figure>
        <img src={business.image_url} alt={business.name} />
        <figcaption>{business.name}</figcaption>
      </figure>
      {business.name}
    </>
  );
}