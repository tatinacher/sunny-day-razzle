import * as React from "react";
import styled from "styled-components";

export const MainPage = () => (
  <Container>
    <div>
      <div>
        <h2>MainPage</h2>
      </div>
    </div>
  </Container>
);

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
