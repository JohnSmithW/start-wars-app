import clsx from 'clsx';

export const TableHead = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <th
      className={clsx(
        'text-pale bg-secondary px-4 py-3 font-medium',
        className
      )}
    >
      {children}
    </th>
  );
};
