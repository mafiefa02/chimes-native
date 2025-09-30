import emptyIllustration from '../../assets/empty.png';

interface EmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="flex h-fit items-center justify-center flex-col gap-8 shrink-0 pb-12 pt-4 my-auto">
      <img
        alt="Empty"
        src={emptyIllustration}
        className="w-full max-w-56 h-auto"
      />
      <div className="space-y-1 text-center">
        <h1 className="font-bold text-xl">{title}</h1>
        <p className="text-gray-500 text-lg">{description}</p>
      </div>
    </div>
  );
};
