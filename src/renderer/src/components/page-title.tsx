interface PageTitleProps {
  title: string;
  description?: string;
}

export const PageTitle = ({ title, description }: PageTitleProps) => {
  return (
    <div className="flex flex-col gap-0">
      <h1 className="text-xl font-bold">{title}</h1>
      {description && <p className="text-sm">{description}</p>}
    </div>
  );
};
