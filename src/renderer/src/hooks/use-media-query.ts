import { IS_SERVER } from '../lib/constants';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';
import { debounce } from 'lodash-es';
import { useCallback, useMemo, useState } from 'react';

type UseMediaQueryOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
  debounce?: number;
};

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
    debounce: delay = 0,
  }: UseMediaQueryOptions = {},
): boolean {
  const getMatches = useCallback(
    (query: string): boolean => {
      if (IS_SERVER) return defaultValue;
      return window.matchMedia(query).matches;
    },
    [defaultValue],
  );

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) return getMatches(query);
    return defaultValue;
  });

  // Handles the change event of the media query.
  const debouncedHandler = useMemo(
    () =>
      debounce(() => {
        setMatches(getMatches(query));
      }, delay),
    [query, delay, getMatches],
  );

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    debouncedHandler();

    // Use deprecated `addListener` and `removeListener` to support Safari < 14 (#135)
    if (matchMedia.addListener) {
      matchMedia.addListener(debouncedHandler);
    } else {
      matchMedia.addEventListener('change', debouncedHandler);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(debouncedHandler);
      } else {
        matchMedia.removeEventListener('change', debouncedHandler);
      }
    };
  }, [query, debouncedHandler]);

  return matches;
}
