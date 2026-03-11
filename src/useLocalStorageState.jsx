import { useState, useEffect } from "react";

export function useLocalStorageState(intialState, keyName) {
  const [value, setValue] = useState(() => {
    const storedVal = JSON.parse(localStorage.getItem(keyName));
    return storedVal || [];
    // return storedVal ? storedVal : [];
  });

  useEffect(() => {
    localStorage.setItem(keyName, JSON.stringify(value));
  }, [value, keyName]);

  return [value, setValue];
}
