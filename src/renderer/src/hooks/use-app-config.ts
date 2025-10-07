import { AppConfig } from '../../../shared/types';
import { useState, useEffect } from 'react';

export const useAppConfig = (key: keyof AppConfig) => {
  const [value, setValue] = useState(window.services.appConfig.get(key));

  useEffect(() => {
    const setAppConfig = (newValue: string) => setValue(newValue);
    const unsubscribe = window.services.appConfig.onChange(key, setAppConfig);
    return () => unsubscribe();
  }, [key]);

  return value;
};
