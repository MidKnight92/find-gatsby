import { useState, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import Cell from "./Cell";
import { getRandomColor } from "./constant";

function App() {
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const btnRef = useRef<HTMLButtonElement>(null);

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

  const toggleGameState = () => {
    setIsGameStarted(!isGameStarted);
    setRandomNumbers(isGameStarted ? [] : getRandomNumbers());
  };

  return (
    <>
      <Heading>Find Gatsby</Heading>
      <Instructions>
        Hi There! My dog Gatsby is an adventerous little guy, and it's hard to
        keep up with him. Today, he's been exploring all over, and I need your
        help to figure out where he's been! Click the cards to uncover clues
        about Gatsby's whereabouts. Find <strong>all three cards</strong> to
        piece together what he's been doing throughout the day. Can you track
        down my curious pup and discover his adventure?
        <strong>
          Ready to start the search? Click the start button and let's go!
        </strong>
      </Instructions>
      <GridContainter>
        {Array.from({ length: 12 }).map((_, idx: number) => (
          <GridItem key={idx}>
            <Cell
              idx={idx}
              btnRef={btnRef}
              randomNumbers={randomNumbers}
              isGameStarted={isGameStarted}
            />
          </GridItem>
        ))}
      </GridContainter>
      <Button
        ref={btnRef}
        onClick={toggleGameState}
        $isGameStarted={isGameStarted}
      >
        {isGameStarted ? "Restart Game" : "Start Game"}
      </Button>
    </>
  );
}

export default App;

const Heading = styled.h1`
  font-size: 100px;
  margin: 20px 0;
  text-align: center;
`;

const Instructions = styled.p`
  margin: 10px auto;
  width: 50vw;
  font-size: 20px;
  text-align: center;
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

const pulse = keyframes`
  0% { opacity: .75; }
  50% { opacity: .5; }
  100% { opacity: 1; }
`;

const Button = styled.button<{
  $isGameStarted: boolean;
}>`
  font-family: "Kirang Haerang", system-ui;
  display: block;
  background-color: smokewhite;
  border: black solid 2px;
  margin: 20px auto;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  ${({ $isGameStarted }) =>
    !$isGameStarted &&
    css`
      animation: ${pulse} 2s infinite ease-in-out;
    `}

  &:hover {
    border: black solid 2px;
  }
  &:active {
    border: black solid 2px;
  }
`;
