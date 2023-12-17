import React from 'react';
import styled from 'styled-components';
import DynamicMap from './DynamicMap';
import { DateTime } from "luxon";

const WeatherContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: rgba(30, 30, 30, .6);
`;

const Temperature = styled.div`
  text-align: center;
  font-size: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin-left: 15px;
    font-size: 2rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const DataName = styled.h2`
margin-bottom: -20px;
  font-size: 3rem;
  color: rgba(30, 30, 30, .6);
  text-align: center;
`;

const WeatherBox = styled.div`
color: #eee;
background: rgba(1, 1, 1, 0.6);
width: 1200px;
height: 325px;
display: flex;
flex-direction: column;
gap: 5px;
justify-content: center;
align-items: center;
margin: 0 auto;
font-size: 1.2rem;


@media (max-width: 1204px) {
  width: 1000px;
  height: 325px; /* Adjust the height for smaller screens */
}
@media (max-width: 1003px) {
  width: 800px;
  height: 300px; /* Adjust the height for smaller screens */
}
@media (max-width: 853px) {
  width: 700px;
  height: 300px; /* Adjust the height for smaller screens */
}
@media (max-width: 701px) {
  width: 500px;
  height: 300px; /* Adjust the height for smaller screens */
}
@media (max-width: 502px) {
  width: 400px;
  height: 300px; /* Adjust the height for smaller screens */
}
@media (max-width: 430px) {
  width: 350px;
  height: 300px; /* Adjust the height for smaller screens */
}
`;

const WeatherImages = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  gap: 25px;
`;

const WeatherImage = styled.img`
  width: 60px;
  height: auto;
`;

const ErrorMessage = styled.div`
font-size: 3rem;
color: rgba(30, 30, 30, .6);
text-align: center;

p {
  font-size: 2rem;
}
`;

const Weather = ({ data }) => {
  if (!data || !data.weather || !data.weather[0]) {
    return <ErrorMessage>
      The city was not found in the list.
      <p>Check the correct spelling of the city and try again.</p></ErrorMessage>;
  }

  // Convert kelvin to celsius
  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  // Convert mph to kmh
  const mphToKmh = (mph) => {
    return mph * 1.60934;
  };

  // Convert timestamp to local hh:mm
  const formatTimestampToHHMM = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Convert timezone to local hh:mm 
  const formatTimezone = (timezone) => {
    const date = new Date();
    const offsetMillis = timezone * 1000;
    const utcTimestamp = date.getTime() + (date.getTimezoneOffset() * 60000);
    const targetTimestamp = utcTimestamp + offsetMillis;
    const targetDate = new Date(targetTimestamp);
    const hours = targetDate.getHours().toString().padStart(2, '0');
    const minutes = targetDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };


  return (
    <div>
      <DataName>{data.name}, {data.sys.country}</DataName>
      <DataName>{formatTimezone(data.timezone)}</DataName>
      <WeatherContainer>
        <Temperature>
          {kelvinToCelsius(data.main.temp).toFixed(0)}&#176;
          <p>
            {data.weather.length > 0 && data.weather[0].main}
            {data.weather.length > 1 && `, ${data.weather[1].main}`}
          </p>
        </Temperature>
      </WeatherContainer>
      <WeatherBox>
        <p>Feels like {kelvinToCelsius(data.main.feels_like).toFixed(0)}&#176;</p>
        <p>
          min {kelvinToCelsius(data.main.temp_min).toFixed(0)}&#176; /
          max {kelvinToCelsius(data.main.temp_max).toFixed(0)}&#176;
        </p>
        <p>Humidity: {data.main.humidity}%</p>
        <p>Winds: {mphToKmh(data.wind.speed).toFixed(0)}km/h</p>
        <p>Pressure: {data.main.pressure}mbar</p>
        <p>Visibility: {data.visibility}m</p>
        <WeatherImages>
          <div>
            <WeatherImage src="https://i.imgur.com/LkbS1Na.png" alt="Sunrise" />
            <p>{formatTimestampToHHMM(data.sys.sunrise)}</p>
          </div>
          <div>
            <WeatherImage src="https://i.imgur.com/ZLE7q6S.png" alt="Sunset" />
            <p>{formatTimestampToHHMM(data.sys.sunset)}</p>
          </div>
        </WeatherImages>
      </WeatherBox>
      <DynamicMap lat={data.coord.lat} lon={data.coord.lon} />
    </div>
  );
};
export default Weather;
