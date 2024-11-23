import { useEffect, useState } from "react";
import { CellProps, initialImage, imgs, notHereImage } from "./constant";

const Cell: React.FC<CellProps> = ({
  randomNumbers,
  idx,
  btnRef,
  isGameStarted,
}): any => {
  const [imgHref, setImgHref] = useState<string>(initialImage);

  useEffect(() => {
    if (!isGameStarted) {
      setImgHref(initialImage);
    }
  }, [isGameStarted]);

  const handleClick = () => {
    if (!isGameStarted) {
      btnRef.current?.focus();
      return;
    }

    const randomNumberIdx: number = randomNumbers.findIndex(
      (num: number) => num === idx
    );

    setImgHref(randomNumberIdx !== -1 ? imgs[randomNumberIdx] : notHereImage);
  };

  return (
    <img
      onClick={handleClick}
      src={imgHref}
      width="200px"
      style={{ display: "block" }}
      alt="Dog themed image"
    />
  );
};

export default Cell;
