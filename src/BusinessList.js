import React from 'react';
import Business from './Business';

export default function BusinessList({ businesses }) {
  return (
    <>
      {businesses.map((business, i) =>
        <Business key={business.name + i}
          business={business} />
      )}
    </>
  );
}
