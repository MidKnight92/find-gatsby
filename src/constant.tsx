import { RefObject } from "react";

export const initialImage: string = "./public/questionMark.png";
export const notHereImage: string = "./public/notHere.png";

export const imgs: string[] = [
  "./public/cityBoy.png",
  "./public/coolGuy.png",
  "./public/pizza.png",
];

export interface CellProps {
  gatsbyImageCount: number;
  setGatsbyImageCount: React.Dispatch<React.SetStateAction<number>>;
  btnRef: RefObject<HTMLButtonElement>;
  randomNumbers: number[];
  idx: number;
  isGameStarted: boolean;
}

export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};
