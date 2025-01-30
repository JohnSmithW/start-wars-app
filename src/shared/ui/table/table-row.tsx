import clsx from 'clsx';

export const TableRow = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <tr
      className={clsx(
        `border-secondary hover:bg-secondary border-b transition-colors
        last:border-0`,
        className
      )}
    >
      {children}
    </tr>
  );
};
