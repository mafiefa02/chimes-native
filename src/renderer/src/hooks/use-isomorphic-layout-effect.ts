import { IS_SERVER } from '../lib/constants';
import { useEffect, useLayoutEffect } from 'react';

export const useIsomorphicLayoutEffect = IS_SERVER
  ? useLayoutEffect
  : useEffect;
