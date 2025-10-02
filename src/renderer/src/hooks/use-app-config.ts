import { AppConfig } from '../../../shared/types';
import { useState, useEffect } from 'react';

export const useAppConfig = <K extends keyof AppConfig>(key: K) => {
  const [value, setValue] = useState(window.services.appConfig.get(key));

  useEffect(() => {
    const unsubscribe = window.services.appConfig.onChange(key, (newValue) => {
      setValue(newValue);
    });

    return () => {
      unsubscribe();
    };
  }, [key]);

  return value;
};
