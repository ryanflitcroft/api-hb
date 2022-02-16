import React from 'react';
import Business from './Business';

export default function BusinessList({ businesses }) {
  return (
    <div>
      {businesses.map((business, i) =>
        <Business key={business.name + i}
          business={business} />
      )}
    </div>
  );
}