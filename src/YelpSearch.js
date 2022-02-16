import { useState } from 'react';
import BusinessList from './BusinessList';

export default function YelpSearch() {
    // you'll need to track your yelp search results, the loading state, and a form field for location with a default value.
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [businesses, setBusinesses] = useState([]);

  async function handleYelpSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // set the loading state to true
    // use fetch to make a request to your netlify yelp function. Be sure to pass the search query as a query param in the URL
    const response = await fetch(`/.netlify/functions/yelp?search=${search}`);
    console.log('responseSEARCH: ', response);
    const json = await response.json();
    console.log('searchJson: ', json);

    // setBusinesses(json);
    // put the jsonified data in state and set the loading state to false
    setLoading(false);
  }
  
  return (
    <section className='yelp'>
      {/* make the fetch on submit */}
      <form onSubmit={handleYelpSubmit}>
        {/* add inputs/labels for city name, state, and country, using all the things we need with react forms. Don't forget to use the value property to sync these up with the default values in react state */}
        <label>Search Businesses</label>
        <input onChange={(e) => setSearch(e.target.value)}
          value={search} />
        <button>Search yelp</button>
      </form>
      {/* Make a BusinessesList component to import and use here. Use a ternary to display a loading spinner (make a <Spinner /> component for this) if the data is still loading. */}
      <BusinessList businesses={businesses} />
    </section>
  );
}
  
