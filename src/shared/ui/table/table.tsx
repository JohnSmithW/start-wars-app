import clsx from 'clsx';

export const Table = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full overflow-auto">
      <table
        className={clsx(
          'border-secondary w-full border-collapse border text-left text-sm',
          className
        )}
      >
        {children}
      </table>
    </div>
  );
};
