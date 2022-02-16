const fetch = require('node-fetch');
require('dotenv').config();

exports.handler = async (event, context) => {

  try {
    const { city, state, country } = event.queryStringParameters;
    // grab the city, state, and country from the request's query parameters
    // here is an example from the netlify docs:
    // https://functions.netlify.com/playground/#hello%2C-%7Bname%7D 
    const geocodingResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=1&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`);

    const geocodingJson = await geocodingResponse.json();
    // console.log(geocodingJson);

    const latitude = geocodingJson[0].lat;
    const longitude = geocodingJson[0].lon;
    console.log('---lat/lon', latitude, longitude);

    //FIXME: fails here??
    const weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`);

    const weatherJson = await weatherResponse.json();
    console.log('---weatherJson', weatherJson);


    // tragically, we cannot just pass the city name to this API. it wants a latitude and longitude for the weather
    // consult the yelp docs to figure out how to use a city, state, and country to make a request and get the latitude and longitude
    // https://openweathermap.org/api/geocoding-api

    // once you have gotten the lat/lon using the geocoding api, use the lat/lon to get the weather. Consult the docs below:
    // https://openweathermap.org/api/one-call-api


    return { 
      statusCode: 200, 
    // this is where you shoot data back to the user. right now it's sending an empty object--replace this with the weather data. remember, you do need to stringify it, otherwise netlify gets mad. ¯\_(ツ)_/¯
      body: JSON.stringify(weatherJson),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};
