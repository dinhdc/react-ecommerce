export const getLocalStorage = <T = null>(
  key: string,
  parse?: boolean
): T | null => {
  const value = window.localStorage.getItem(key);
  if (!value) return null;
  return (parse ? JSON.parse(value) : value) as unknown as T;
};

export const setLocalStorage = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key: string | string[]): void => {
  if (typeof key !== 'string') {
    key.map((item) => window.localStorage.removeItem(item));
  } else {
    window.localStorage.removeItem(key);
  }
};

export const storage = {
  save: (key: string, value: any) => setLocalStorage(key, value),
  get: (key: string, parse?: boolean) => getLocalStorage(key, parse),
};
