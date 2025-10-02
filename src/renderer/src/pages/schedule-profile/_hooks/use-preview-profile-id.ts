import { PreviewProfileIdContext } from '../_contexts/preview-profile-id-context';
import { useContext } from 'react';

export const usePreviewProfileId = () => {
  const context = useContext(PreviewProfileIdContext);
  if (!context) {
    throw new Error(
      'usePreviewProfileId must be used within a PreviewProfileIdProvider',
    );
  }
  return context;
};
