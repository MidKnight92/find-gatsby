import { useState } from "react";
import styled from "styled-components";
import Cell from "./Cell";
import { getRandomColor } from "./constant";

function App() {
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const getRandomNumbers = () => {
    const nums: number[] = [];
    for (let i = 0; i < 3; i++) {
      const randomNumber = Math.floor(Math.random() * 12);
      nums.length && nums.includes(randomNumber)
        ? i--
        : nums.push(randomNumber);
    }
    return nums;
  };

  const gameState = () => {
    setIsGameStarted(!isGameStarted);
    setRandomNumbers(isGameStarted ? [] : getRandomNumbers());
  };

  return (
    <>
      <Heading>
        Find Gatsby
      </Heading>
      <Instructions>
        My dog is an adventerous guy and it's hard to keep up with him. Help me
        find him by clicking the cards to see where he might be now.
      </Instructions>
      <GridContainter>
        {Array.from({ length: 12 }).map((_, idx: number) => (
          <GridItem key={idx}>
            <Cell
              idx={idx}
              randomNumbers={randomNumbers}
              isGameStarted={isGameStarted}
            />
          </GridItem>
        ))}
      </GridContainter>
      <Button onClick={gameState}>
        {isGameStarted ? "Restart Game" : "Start Game"}
      </Button>
    </>
  );
}

export default App;

const Heading = styled.h1`
  font-family: "Kirang Haerang", "Barriecito", system-ui;
  font-size: 100px;
  margin: 20px 0;
  text-align: center;
  color: whitesmoke;
`;

const Instructions = styled.p`
  margin: 10px auto;
  width: 50vw;
  font-family: "Kirang Haerang", "Barriecito", system-ui;
  font-size: 30px;
  text-align: center;
  color: whitesmoke;
`;

const GridContainter = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  border: whitesmoke solid 4px;
`;

const GridItem = styled.button`
  display: block;
  border: whitesmoke solid 4px;
  margin: 20px;
  padding: 0;

  &:hover {
    border: ${() => getRandomColor} solid 4px;
  }
  &:active {
    border: ${() => getRandomColor} solid 4px;
  }
`;

const Button = styled.button`
  font-family: "Kirang Haerang", "Barriecito", system-ui;
  display: block;
  background-color: smokewhite;
  border: black solid 2px;
  margin: 20px auto;
  padding: 10px 20px;
  font-weight: bold;

  &:hover {
    border: black solid 2px;
  }
  &:active {
    border: black solid 2px;
  }
`;
