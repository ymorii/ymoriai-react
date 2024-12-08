import { useState, useCallback } from 'react';

const useToggle = () => {
  const [isOpen, setToggle] = useState(false);
  const toggle = useCallback(() => {
    setToggle((prev) => !prev);
  }, []);
  return [isOpen, toggle];
};

export { useToggle };
