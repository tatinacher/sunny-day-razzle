import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { fetchCity } from "../features/city";
import { flags, units } from "../lib/constants";

export const CityWeatherPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const city = useSelector((state) => state.city);
  const { name, weather, main, wind, sys } = city;

  React.useEffect(() => {
    if (!city || id || !name || name.toLowerCase() !== id) {
      dispatch(fetchCity(id));
    }
  }, [id]);

  if (!city || !name || !weather || !main || !wind || !sys) return null;

  return (
    <Container>
      <div>
        <div>
          <Header>
            {name} {flags[sys.country]}
          </Header>
        </div>
        <TimeTemperature>
          <TemperatureHeader>
            {main?.temp}
            {units.metric.symbol}
            <img
              width="64px"
              src={`${process.env.RAZZLE_PUBLIC_URL}/assets/icons/${weather[0].icon}@2x.png`}
            />
          </TemperatureHeader>
          <p>Wind {wind.speed}</p>
        </TimeTemperature>
      </div>
    </Container>
  );
};

export const TimeTemperature = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const TemperatureBlock = styled.div`
  box-shadow: 2px 3px 5px 0px rgb(0 0 0 / 12%);
  padding: 0 25px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  margin: 20px 20px 0 0;
  width: 200px;
  height: 200px;
`;

export const Container = styled.div`
  padding: 30px;
`;

export const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  max-width: 300px;
`;

export const CardBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export const Header = styled.h1`
  display: flex;
  align-items: center;
  font-size: 50px;
`;

export const TemperatureHeader = styled.h1`
  display: flex;
  align-items: center;
  margin: 0;
`;
