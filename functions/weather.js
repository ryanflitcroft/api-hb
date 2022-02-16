const fetch = require('node-fetch');
require('dotenv').config();

exports.handler = async (event, context) => {

  try {
    const { city, state, country } = event.queryStringParameters;

    const geocodingResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=1&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`);

    const geocodingJson = await geocodingResponse.json();

    const latitude = geocodingJson[0].lat;
    const longitude = geocodingJson[0].lon;

    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`);

    const weatherJson = await weatherResponse.json();

    return { 
      statusCode: 200, 

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
