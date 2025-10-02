import { useAppConfig } from '../../../hooks/use-app-config';
import { PreviewProfileIdContext } from './preview-profile-id-context';
import { useState } from 'react';

export const PreviewProfileIdProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const selectedProfileId = useAppConfig('activeProfileSchedule');
  const [value, setValue] = useState(selectedProfileId);
  return (
    <PreviewProfileIdContext.Provider
      value={{ previewProfileId: value, setPreviewProfileId: setValue }}
    >
      {children}
    </PreviewProfileIdContext.Provider>
  );
};
