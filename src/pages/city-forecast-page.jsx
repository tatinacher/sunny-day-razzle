import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useParams } from "react-router-dom";
// import dayjs from "dayjs";

import { fetchCity } from "../features/city";
import { flags, units } from "../lib/constants";

export const CityPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { city, list } = useSelector((state) => state.city);

  React.useEffect(() => {
    if (!city || (id && name.toLowerCase() !== id)) {
      dispatch(fetchCity(id));
    }
  }, [id]);

  if (!city) return null;

  const { name, country, population } = city;

  if (!name || name.toLowerCase() !== id) return null;

  const [temperature_now, ...other] = list;

  const closeTemp = list.slice(0, 5);

  return (
    <Container>
      <div>
        <div>
          <Header>
            {name} {flags[country]}
          </Header>
          {/* <p>Population {population}</p> */}
        </div>
        <TimeTemperature>
          {closeTemp.map((datetime) => (
            <TemperatureBlock key={datetime.dt}>
              <TemperatureHeader>
                {datetime?.main?.temp}
                {units.metric.symbol}
                <img
                  width="64px"
                  src={`${process.env.RAZZLE_PUBLIC_URL}/assets/icons/${datetime.weather[0].icon}@2x.png`}
                />
              </TemperatureHeader>
              <p>Wind {datetime.wind.speed}</p>
              {/* <h2>{dayjs.unix(datetime.dt).format("HH:mm")}</h2> */}
            </TemperatureBlock>
          ))}
        </TimeTemperature>
      </div>
    </Container>
  );
};

export const TimeTemperature = styled.div`
  display: flex;
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
`;

export const TemperatureHeader = styled.h1`
  display: flex;
  align-items: center;
  margin: 0;
`;
