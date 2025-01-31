import clsx from 'clsx';

export const TableHead = ({
  className,
  children,
  handleClick,
}: {
  className?: string;
  children: React.ReactNode;
  handleClick: ((event: unknown) => void) | undefined;
}) => {
  return (
    <th
      className={clsx(
        'text-pale bg-secondary px-4 py-3 font-medium',
        className
      )}
      onClick={handleClick}
    >
      {children}
    </th>
  );
};
