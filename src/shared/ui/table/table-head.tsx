import clsx from 'clsx';

export const TableHead = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <th className={clsx('text-pale px-4 py-2 font-medium', className)}>
      {children}
    </th>
  );
};
