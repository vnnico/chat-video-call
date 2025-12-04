import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type StorageContextType = {
  getItem: <T>(key: string, fallback: T) => T;
  setItem: <T>(key: string, value: T) => void;
  removeItem: (key: string) => void;

  // Convenience for your specific need:
  offlineStorage: Record<string, any[]>;
  setOfflineStorage: (value: Record<string, any[]>) => void;
};

const StorageContext = createContext<StorageContextType | null>(null);

export function StorageProvider({ children }: { children: ReactNode }) {
  // Load initial offline messages
  const [offlineStorage, setOfflineStorage] = useState<Record<string, any[]>>(
    () => {
      try {
        const item = sessionStorage.getItem("offline_messages");
        return item ? JSON.parse(item) : {};
      } catch {
        return {};
      }
    }
  );

  // Update sessionStorage anytime offline messages change
  useEffect(() => {
    try {
      sessionStorage.setItem(
        "offline_messages",
        JSON.stringify(offlineStorage)
      );
    } catch (err) {
      console.error("Failed writing offline_messages", err);
    }
  }, [offlineStorage]);

  // Generic getter (for other keys too)
  const getItem = <T,>(key: string, fallback: T): T => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : fallback;
    } catch {
      return fallback;
    }
  };

  const setItem = <T,>(key: string, value: T) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Failed writing key:", key, err);
    }
  };

  const removeItem = (key: string) => {
    sessionStorage.removeItem(key);
  };

  return (
    <StorageContext.Provider
      value={{
        getItem,
        setItem,
        removeItem,
        offlineStorage,
        setOfflineStorage,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}

export const useStorage = () => {
  const ctx = useContext(StorageContext);
  if (!ctx) throw new Error("useStorage must be used inside StorageProvider");
  return ctx;
};
