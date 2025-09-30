import { parentRoutes } from '../../../lib/constants';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const useSidebarShortcuts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey) {
        const keyAsNumber = parseInt(event.key, 10);

        if (
          !isNaN(keyAsNumber) &&
          keyAsNumber >= 1 &&
          keyAsNumber <= parentRoutes.length
        ) {
          event.preventDefault();
          const targetRoute = parentRoutes[keyAsNumber - 1];
          if (targetRoute) {
            navigate(targetRoute.href);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);
};
