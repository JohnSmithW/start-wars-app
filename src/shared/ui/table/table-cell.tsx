import clsx from 'clsx';

export const TableCell = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <td className={clsx('px-4 py-3 text-base', className)}>{children}</td>;
};
