import { useState, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import Cell from "./Cell";

function App() {
  const [gameCount, setGameCount] = useState<number>(1);
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [gatsbyImageCount, setGatsbyImageCount] = useState<number>(0);
  const btnRef = useRef<HTMLButtonElement>(null);

  const getRandomNumbers = (): number[] => {
    const nums: number[] = [];
    for (let i = 0; i < 3; i++) {
      const randomNumber = Math.floor(Math.random() * 12);
      nums.length && nums.includes(randomNumber)
        ? i--
        : nums.push(randomNumber);
    }
    return nums;
  };

  const toggleGameState = (): void => {
    setGameCount(prevGameCount => prevGameCount + 1);
    setIsGameStarted(prevIsGameStarted => !prevIsGameStarted);
    setRandomNumbers(isGameStarted ? [] : getRandomNumbers());
    setGatsbyImageCount(0);
  };

  const instructions: JSX.Element = (
    <>
      Hi There! My dog Gatsby is an adventerous little guy, and it's hard to
      keep up with him. Today, he's been exploring all over, and I need your
      help to figure out where he's been! Click the cards to uncover clues about
      Gatsby's whereabouts. Find <strong>all three cards</strong> to piece
      together what he's been doing throughout the day. Can you track down my
      curious pup and discover his adventure?{" "}
      <strong>Click the start button to start the search!</strong>
    </>
  );

  const thankYouMessage: JSX.Element = (
    <>
      Wow! What a journey! Gatsby sure knows how to keep us on our toes. You're
      the best for helping me track him down! Thanks for playing -{" "}
      <strong>I couldn't have done it without you.</strong>
    </>
  );

  return (
    <>
      <Heading>Find Gatsby</Heading>
      <Text>{gatsbyImageCount === 3 ? thankYouMessage : instructions}</Text>
      <GridContainter $gatsbyImageCount={gatsbyImageCount}>
        {Array.from({ length: 12 }).map((_, idx: number) => (
          <GridItem key={idx}>
            <Cell
              key={gameCount}
              gatsbyImageCount={gatsbyImageCount}
              setGatsbyImageCount={setGatsbyImageCount}
              idx={idx}
              btnRef={btnRef}
              randomNumbers={randomNumbers}
              isGameStarted={isGameStarted}
              gameCount={gameCount}
            />
          </GridItem>
        ))}
      </GridContainter>
      <Button
        ref={btnRef}
        onClick={toggleGameState}
        $isGameStarted={isGameStarted}
        $gatsbyImageCount={gatsbyImageCount}
      >
        {isGameStarted ? "Restart Game" : "Start Game"}
      </Button>
      <Footer>
        © {new Date().getFullYear()} Stephanie Viveros | All rights reserved.
      </Footer>
    </>
  );
}

export default App;

const getRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};

const Footer = styled.footer`
  font-size: small;
  display: absolute;
  text-align: center;
  width: 100%;
`;

const Heading = styled.h1`
  font-size: 5rem;
  margin: 20px 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Text = styled.p`
  margin: 0 auto 20px auto;
  width: 80%;
  font-size: 1.25rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
    width: 90%;
  }
`;

const GridContainter = styled.div<{ $gatsbyImageCount: number }>`
  margin: auto auto;
  width: 60%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  ${({ $gatsbyImageCount }) =>
    `border: ${$gatsbyImageCount === 3 ? "lime" : "whitesmoke"} solid 4px;`}

  padding: 10px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const GridItem = styled.button`
  display: block;
  border: whitesmoke solid 4px;
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
  $gatsbyImageCount: number;
}>`
  font-family: "Kirang Haerang", system-ui;
  display: block;
  background-color: smokewhite;
  border: black solid 2px;
  margin: 20px auto;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  width: 80% @media (max-width: 768px) {
    padding: 10px;
  }

  ${({ $isGameStarted, $gatsbyImageCount }) =>
    ($gatsbyImageCount === 3 || !$isGameStarted) &&
    css`
      animation: ${pulse} 2s infinite ease-in-out;
    `}

  &:hover {
    border: ${() => getRandomColor} solid 2px;
  }
  &:active {
    border: ${() => getRandomColor} solid 2px;
  }
`;
