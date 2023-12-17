import React, { useState } from "react";
import styled from "styled-components";
import Weather from "@/components/Weather";
import Head from "next/head";

const Background = styled.div`
  background-image: url('https://images6.alphacoders.com/134/1341842.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  max-width: 500px;
  padding: 20px;
`;

const SearchBox = styled.input`
  width: 400px;
  height: 40px;
  border: 1px solid rgba(30, 30, 30, 0.2);
  border-radius: 10px;
  padding: 10px;
  outline: none;
`;

const PrimaryButton = styled.button`
  height: 40px;
  display: flex;
  align-items: center;
  background: rgba(250, 250, 250, .4);
  border: 1px solid rgba(30, 30, 30, 0.2);
  border-radius: 5px;
  padding: 5px;
  color: #000;
  margin-left: 10px;
  font-size: 1.3rem;
  transition: .3s ease;

  &:hover {
    background: rgba(1, 1, 1, 0.4);
    color: #eee;
  }
`;

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    if (!city) return;

    const apiKey = process.env.NEXT_PUBLIC_WEATHER_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log("Weather Data:", data);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <>
    <Head>
    <title>Weather App</title>
    <link rel="icon" href="/favicon.ico" />
    </Head>
    <Background>
      <Form onSubmit={handleSearch}>
        <SearchBox
          value={city}
          type="text"
          placeholder="Search city"
          onChange={handleCityChange}
        />
        <PrimaryButton type="submit">Search</PrimaryButton>
      </Form>
      {weatherData && <Weather data={weatherData} />}
    </Background>
    </>
  );
}
