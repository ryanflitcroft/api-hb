import React from 'react';

export default function Weather({ weather }) {
  console.log('||weather: ', weather);
  return (
    <>
      <p>
        The expected weather at {weather.coord.lat}, {weather.coord.lon} is {weather.weather[0].description}.
      </p>
    </>
  );
}
