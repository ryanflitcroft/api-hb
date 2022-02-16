import { useState } from 'react';
import WeatherSpinner from './WeatherSpinner';

export default function WeatherSearch() {
      // you'll need to track your weather search results, the loading state, and a form field for location with a default value.
  const [weather, setWeather] = useState([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  
  async function handleWeatherSubmit(e) {
    e.preventDefault();
    setLoading(true);
        // set the loading state to true
        // use fetch to make a request to your netlify weather function. Be sure to pass the location as a query param in the URL
    const response = await fetch(`/.netlify/functions/weather?city=${city}&state=${state}&country=${country}`);
      
    const json = await response.json();
    setWeather(json);
        // put the jsonified data in state and set the loading state to false
  }
      
  return (
    <section className='weather'>
      {/* make the fetch on submit */}
      <form onSubmit={handleWeatherSubmit}>
            Search weather for a city
        {/* add inputs/labels for city name, state, and country, using all the things we need with react forms. Don't forget to use the value property to sync these up with the default values in react state */}
        <label htmlFor='city'>City</label>
        <input name='city'
          onChange={(e) => setCity(e.target.value)}
          value={city} />
        <label htmlFor='state'>State</label>
        <input name='state'
          onChange={(e) => setState(e.target.value)}
          value ={state} />
        <label htmlFor='country'>Country</label>
        <input name='country'
          onChange={(e) => setCountry(e.target.value)}
          value={country} />
        <button>Get weather</button>
      </form>
      {/* Make a ForecastList component to import and use here. Use a ternary to display a loading spinner (make a <Spinner /> component for this) if the data is still loading. */}
      {
        loading
        &&
        <WeatherSpinner />
      }

    </section>
  );

}
