import { useEffect, useState } from "react";

/** Estado persistido no localStorage, tolerante a navegadores que bloqueiam o armazenamento. */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* armazenamento indisponível: segue funcionando só em memória */
    }
  }, [key, value]);

  return [value, setValue] as const;
}
