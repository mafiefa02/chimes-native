import { useEffect, useState } from 'react';

export const useTime = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const delay = 1000 - new Date().getMilliseconds();
    const timeoutId = setTimeout(() => {
      setTime(new Date());
      const intervalId = setInterval(() => {
        setTime(new Date());
      }, 1000);
      return () => clearInterval(intervalId);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, []);
  return { time };
};
