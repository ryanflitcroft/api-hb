import { useState } from 'react';
import BusinessList from './BusinessList';
import YelpSpinner from './YelpSpinner';

export default function YelpSearch() {
    // you'll need to track your yelp search results, the loading state, and a form field for location with a default value.
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [businesses, setBusinesses] = useState([]);

  async function handleYelpSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`/.netlify/functions/yelp?search=${search}`);
    const json = await response.json();
    setBusinesses(json);
    setLoading(false);
  }
  
  return (
    <section className='yelp'>
      <form onSubmit={handleYelpSubmit}>
        <label>Search Businesses</label>
        <input onChange={(e) => setSearch(e.target.value)}
          value={search} />
        <button>Search yelp</button>
      </form>
      {
        loading
        && <YelpSpinner />
      }
      <BusinessList businesses={businesses} />
    </section>
  );
}
  
