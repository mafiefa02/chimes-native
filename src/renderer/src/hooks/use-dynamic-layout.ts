import { useLayoutEffect, useRef } from 'react';

export const useDynamicLayout = () => {
  const mainLayoutRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (headerRef.current && mainRef.current && mainLayoutRef.current) {
      const { offsetHeight } = headerRef.current;
      mainLayoutRef.current.style.setProperty(
        '--header-height',
        `${offsetHeight + 2}px`,
      );

      const mainStyle = window.getComputedStyle(mainRef.current);
      const mainPaddingTop = parseFloat(mainStyle.paddingTop);
      const mainPaddingBottom = parseFloat(mainStyle.paddingBottom);
      mainLayoutRef.current.style.setProperty(
        '--main-vertical-padding',
        `${mainPaddingTop + mainPaddingBottom}px`,
      );
    }
  }, []);

  return { mainLayoutRef, headerRef, mainRef };
};
