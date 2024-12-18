import { RefObject, useCallback, useRef, useState } from "react";
import styled from "styled-components";
import initialImage from "./assets/images/questionMark.png";
import notHereImage from "./assets/images/notHere.png";
import cityBoy from "./assets/images/cityBoy.png";
import coolGuy from "./assets/images/coolGuy.png";
import pizza from "./assets/images/pizza.png";
interface CellProps {
  gameCount: number;
  gatsbyImageCount: number;
  setGatsbyImageCount: React.Dispatch<React.SetStateAction<number>>;
  btnRef: RefObject<HTMLButtonElement>;
  randomNumbers: number[];
  idx: number;
  isGameStarted: boolean;
}

const imgs: string[] = [cityBoy, coolGuy, pizza];

const Cell: React.FC<CellProps> = ({
  gameCount,
  gatsbyImageCount,
  setGatsbyImageCount,
  randomNumbers,
  idx,
  btnRef,
  isGameStarted,
}): any => {
  const [imgHref, setImgHref] = useState<string>(initialImage);
  const isClicked = useRef<boolean>(false);

  const updateImageStateAndCount = () => {
    const randomNumberIdx: number = randomNumbers.findIndex(
      (num: number) => num === idx
    );
    setImgHref(randomNumberIdx !== -1 ? imgs[randomNumberIdx] : notHereImage);
    isClicked.current = true;
    randomNumberIdx !== -1 && setGatsbyImageCount(prevGatsbyImageCount => prevGatsbyImageCount + 1);
  };

  const handleClick = useCallback(() => {
    if (!isGameStarted) {
      btnRef.current?.focus();
      return;
    } else if (gatsbyImageCount === 3 || isClicked.current) {
      return;
    } else {
      updateImageStateAndCount();
    }
  }, [isGameStarted, gatsbyImageCount]);

  return (
    <Image onClick={handleClick} src={imgHref} alt="Dog themed image"></Image>
  );
};

export default Cell;

const Image = styled.img`
  width: 100%;
  height: auto;
  diplay: block;
`;
