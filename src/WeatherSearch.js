import { useState } from 'react';
import Weather from './Weather';
import WeatherSpinner from './WeatherSpinner';

export default function WeatherSearch() {

  const [weather, setWeather] = useState([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleWeatherSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`/.netlify/functions/weather?city=${city}&state=${state}&country=${country}`);
    const json = await response.json();
    setWeather(json);
    setLoading(false);
  }

  return (
    <section className='weather'>
      {/* make the fetch on submit */}
      <form onSubmit={handleWeatherSubmit}>
            Search weather for a city
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

      {
        weather.length !== 0
        &&
        <Weather weather={weather}/>
      }
      {
        loading
        &&
        <WeatherSpinner />
      }
    </section>
  );
}