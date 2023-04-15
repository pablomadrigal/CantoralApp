/* eslint-disable @typescript-eslint/no-explicit-any */
//https://usehooks.com/useKeyPress/

import { useState, useEffect } from "react";

function useKeyPress(targetKey: string): boolean {
  const [keyPressed, setKeyPressed] = useState(false);
  function downHandler({ key }: any): void {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }: any): void => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);
  return keyPressed;
}

export default useKeyPress;
