import { useCallback, useEffect, useState } from "react";
import { CellProps, initialImage, imgs, notHereImage } from "./constant";
import styled from "styled-components";

const Cell: React.FC<CellProps> = ({
  gatsbyImageCount,
  setGatsbyImageCount,
  randomNumbers,
  idx,
  btnRef,
  isGameStarted,
}): any => {
  const [imgHref, setImgHref] = useState<string>(initialImage);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const resetImageState = () => {
    setImgHref(initialImage);
    setIsClicked(false);
  };

  useEffect(() => {
    if (!isGameStarted) {
      resetImageState();
    }
  }, [isGameStarted]);

  const updateImageStateAndCount = () => {
    const randomNumberIdx: number = randomNumbers.findIndex(
      (num: number) => num === idx
    );
    setImgHref(randomNumberIdx !== -1 ? imgs[randomNumberIdx] : notHereImage);
    setIsClicked(true);
    randomNumberIdx !== -1 && setGatsbyImageCount(gatsbyImageCount + 1);
  };

  const handleClick = useCallback(() => {
    if (!isGameStarted) {
      btnRef.current?.focus();
      return;
    }
    if (gatsbyImageCount === 3 || isClicked) return;

    updateImageStateAndCount();
  }, [isGameStarted, isClicked, gatsbyImageCount]);

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
