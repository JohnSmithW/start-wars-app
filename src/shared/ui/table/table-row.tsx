import clsx from 'clsx';

export const TableRow = ({
  className,
  children,
  handleClick,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  handleClick?: () => void;
}) => {
  return (
    <tr
      onClick={handleClick}
      className={clsx(
        `border-secondary bg-tertiary hover:bg-secondary cursor-pointer border-b
        transition-colors last:border-0`,
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
};
