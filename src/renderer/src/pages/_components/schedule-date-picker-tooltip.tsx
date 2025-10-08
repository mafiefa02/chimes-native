import { KbdIndicator } from '../../components/kbd-indicator';
import { useIsMac } from '../../hooks/use-is-mac';

export const ScheduleDatePickerTooltip = () => {
  const isMac = useIsMac();
  const cmdKey = isMac ? '⌘' : 'Ctrl';
  return (
    <div className="flex items-center gap-1.5 *:text-background">
      <p>Use</p>
      <KbdIndicator className="inline-flex h-fit bg-transparent border-1">
        {cmdKey} + ←
      </KbdIndicator>{' '}
      <p>or </p>
      <KbdIndicator className="inline-flex h-fit bg-transparent border-1">
        {cmdKey} + →
      </KbdIndicator>{' '}
      <p>to change date.</p>
    </div>
  );
};
