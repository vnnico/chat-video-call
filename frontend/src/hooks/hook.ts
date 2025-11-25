import { useEffect, useState } from "react";

export function useSessionStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = sessionStorage.getItem(key);
      console.log("[INIT]", key, "=>", item);

      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error("error reading SessionStorage key: ", key, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      console.log("[WRITE]", key, "=>", storedValue);

      sessionStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("error setting SessionStorage key: ", key, error);
    }
  }, [storedValue, key]);

  return [storedValue, setStoredValue] as const;
}
