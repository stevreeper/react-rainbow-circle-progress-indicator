import React from "react";

import { CircularIndicator } from "./components/CircularIndicator";
import { Container, GlobalStyle } from "./styles";

const colors = [
  "rgb(196,61,64)",
  "rgb(213,71,74)",
  "rgb(231,80,84)",
  "rgb(248,90,94)",
  "rgb(235,113,10)",
  "rgb(247,143,32)",
  "rgb(255,224,29)",
  "rgb(220,219,52)",
  "rgb(97,200,133)",
  "rgb(71,189,106)",
  "rgb(44,178,79)",
];

function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <CircularIndicator
          width={200}
          height={200}
          total={0.87}
          colors={colors}
        />
      </Container>
    </>
  );
}

export default App;
