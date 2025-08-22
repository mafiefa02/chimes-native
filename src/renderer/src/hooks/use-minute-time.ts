import { useState, useEffect } from 'react';

/**
 * A custom hook that returns the current time, but only updates
 * its value at the start of every minute.
 */
export const useMinuteTime = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const now = new Date();
    const delay = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
    const timeoutId = setTimeout(() => {
      setTime(new Date());
      const intervalId = setInterval(() => {
        setTime(new Date());
      }, 60000);
      return () => clearInterval(intervalId);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, []);
  return { time };
};
