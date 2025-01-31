import { QueueListIcon, TableCellsIcon } from '@heroicons/react/24/solid';

interface ICharacterTableSearchProps {
  isTable: boolean;
  handleClick: () => void;
}
export const ViewSwitcher: React.FC<ICharacterTableSearchProps> = ({
  isTable,
  handleClick,
}) => {
  return (
    <div
      className="bg-secondary hover:bg-primary focus-visible:ring-ring
        hover:text-accent-foreground flex h-9 w-9 cursor-pointer items-center
        justify-center gap-2 rounded-md text-base text-sm font-medium
        whitespace-nowrap transition-colors hover:border focus-visible:ring-1
        focus-visible:outline-none disabled:pointer-events-none
        disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4
        [&_svg]:shrink-0"
      onClick={handleClick}
    >
      {isTable ? (
        <QueueListIcon className="h-4 w-4" />
      ) : (
        <TableCellsIcon className="h-4 w-4" />
      )}
    </div>
  );
};
