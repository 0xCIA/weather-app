import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
background: rgba(1, 1, 1, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1204px) {
    width: 1000px;
    height: 500px; /* Adjust the height for smaller screens */
  }
  @media (max-width: 1003px) {
    width: 800px;
    height: 500px; /* Adjust the height for smaller screens */
  }
  @media (max-width: 853px) {
    width: 700px;
    height: 500px; /* Adjust the height for smaller screens */
  }
  @media (max-width: 701px) {
    width: 500px;
    height: 500px; /* Adjust the height for smaller screens */
  }
  @media (max-width: 502px) {
    width: 400px;
    height: 500px; /* Adjust the height for smaller screens */
  }
  @media (max-width: 430px) {
    width: 350px;
    height: 500px; /* Adjust the height for smaller screens */
  }
`;

const Instructions = styled.div`
  width: 900px;
  padding: 10px;
  color: #fff;
  font-size: 1.2rem;
  text-align: center;

  @media (max-width: 1204px) {
    width: 1000px;
  }
  @media (max-width: 1003px) {
    width: 800px;
  }
  @media (max-width: 853px) {
    width: 700px;
  }
  @media (max-width: 701px) {
    width: 500px;
  }
  @media (max-width: 502px) {
    width: 400px;
  }
  @media (max-width: 430px) {
    width: 350px;
  }
`;

const IframeContainer = styled.div`
  width: 900px;
  height: 400px;
  border: 15px solid rgba(50, 50, 50, .5);
  border-radius: 5px;

  @media (max-width: 1003px) {
    width: 750px;
    height: 400px; /* Adjust the height for smaller screens */
  }
  @media (max-width: 853px) {
    width: 650px;
    height: 400px; /* Adjust the height for smaller screens */
  }
  @media (max-width: 701px) {
    width: 450px;
    height: 400px; /* Adjust the height for smaller screens */
  }
  @media (max-width: 502px) {
    width: 400px;
    height: 400px; /* Adjust the height for smaller screens */
  }
  @media (max-width: 430px) {
    width: 350px;
    height: 500px; /* Adjust the height for smaller screens */
  }
`;

const Title = styled.p`
font-size: 1.5rem;
`;

const Subtitle = styled.p`
font-size: 1rem;
`;

const DynamicMap = ({ lat, lon }) => {
    const [mapSrc, setMapSrc] = useState('');

    useEffect(() => {
        if (lat && lon) {
            const newMapSrc = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&zoom=7&level=surface&overlay=rain&menu=&message=true&marker=&calendar=&pressure=&type=map&location=coordinates&detail=&detailLat=${lat}&detailLon=${lon}&metricWind=default&metricTemp=default&lang=en`;
            setMapSrc(newMapSrc);
        }
    }, [lat, lon]);

    return (
        <Container>
            <Instructions>
                <Title>Online precipitation map (rain, snow)</Title>
                <Subtitle>Dynamic precipitation map in real-time. Areas with rain are marked with a solid line, squares - with snow.
                    Using the horizontal scroll line at the bottom of the map, you will find out the precipitation forecast for the coming week.</Subtitle>
            </Instructions>
            <IframeContainer>
                {lat && lon && (
                    <iframe
                        src={mapSrc}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        title="Windy Map"
                    ></iframe>
                )}
            </IframeContainer>
        </Container>
    );
};
export default DynamicMap;