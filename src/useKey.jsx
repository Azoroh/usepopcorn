import { useEffect } from "react";

export function useKey(KEY, action) {
  useEffect(() => {
    function callback(e) {
      if (e.key.toLowerCase() === KEY.toLowerCase()) action();
    }

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [KEY, action]);
}
