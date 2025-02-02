import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Character,
  CharacterAPI,
  useCharacterStore,
} from '@/entities/character';
import { useQuery } from '@tanstack/react-query';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/shared/ui/table';
import { HeightIcon } from '@/shared/ui/height-icon';
import { WeightIcon } from '@/shared/ui/weight-icon';
import { GenderIcon } from '@/shared/ui/gender-icon';
import { ColorCircle } from '@/shared/ui/color-circle';
import { CharacterTableSearch } from './character-table-search';
import { CharacterTablePagination } from './character-table-pagination';
import Spinner from '@/shared/ui/spinner';
import { ViewSwitcher } from './view-switcher';
import { List } from '../../../shared/ui/list';
import { CharacterCard } from './character-card';

/**
 * The CharacterTable component is a table that displays a list of characters.
 * The component supports sorting, searching, and pagination.
 * The component also supports changing the view from table to list.
 * The component fetches the list of characters from the API and stores it in the
 * character list store.
 * The component also updates the character list store when the user searches for
 * characters.
 * The component renders a table with the character list, or a list of character cards,
 * depending on the view chosen by the user.
 * The component also renders a search bar, a view switcher, and a pagination component.
 * The component handles the search, view change, and pagination events.
 * The component renders a loading spinner while the data is being fetched.
 * The component renders an error message if the API returns an error.
 * @returns {JSX.Element} The rendered component.
 */
export const CharacterTable = () => {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'name',
      desc: false,
    },
  ]);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isTable, setIsTable] = useState<boolean>(true);
  const columnHelper = createColumnHelper<Character>();
  const { data, error, isLoading, isError } = useQuery(
    CharacterAPI.characterQueries.list(page, search)
  );

  const { list } = useCharacterStore((state) => state);

  useEffect(() => {
    /**
     * Update the character list store with the data from the API
     * @param {Character[]} data.result - The list of characters from the API
     * @returns {void}
     */
    if (data?.result) {
      useCharacterStore.setState((state) => {
        const existingMap = new Map(state.list.map((char) => [char.url, char]));
        const updatedList = data.result.map((item) => {
          const existingItem = existingMap.get(item.url);
          const editedItem =
            state.editedList instanceof Map && typeof item.url === 'string'
              ? state.editedList.get(item.url)
              : null;

          return editedItem
            ? { ...item, ...editedItem }
            : { ...item, ...existingItem };
        });

        return { list: updatedList };
      });
    }
  }, [data?.result]);

  /**
   * Decreases the current page number by one, if the current page
   * is greater than the first page.
   * @returns {void}
   */

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  /**
   * Updates the page state to the next page, if the current page is
   * not the last page.
   * @returns {void}
   */
  const handleNext = () => {
    const pages = data ? Math.ceil(data.count / 10) : 1;
    if (page < pages) {
      setPage((prev) => prev + 1);
    }
  };
  /**
   * Updates the page state to the chosen page.
   * @param {number} chosenPage - The page number to switch to.
   * @returns {void}
   */
  const handlePage = (chosenPage: number) => {
    setPage(chosenPage);
  };

  const columns = [
    columnHelper.accessor('name', {
      header: () => <div>Name</div>,
      enableSorting: true,
    }),
    columnHelper.accessor('height', {
      header: () => (
        <div className="flex items-center gap-1.5">
          Height <HeightIcon />
        </div>
      ),
      cell: (info) => <div>{info.getValue()} cm</div>,
      enableSorting: true,
    }),
    columnHelper.accessor('mass', {
      header: () => (
        <div className="flex items-center gap-1.5">
          Mass <WeightIcon />
        </div>
      ),
      cell: (info) => <div>{info.getValue()} kg</div>,
      enableSorting: true,
    }),

    columnHelper.accessor('gender', {
      header: () => <div className="flex items-center">Gender</div>,
      cell: (info) => (
        <div className="flex items-center">
          {info.getValue() === 'male' || info.getValue() === 'female' ? (
            <GenderIcon gender={info.getValue() || null} fill="fill-base" />
          ) : (
            info.getValue()
          )}
        </div>
      ),
      enableSorting: false,
    }),
    columnHelper.accessor('skin_color', {
      header: () => 'Skin Color',
      cell: (info) => (
        <div className="flex items-center gap-1">
          {info.getValue()}{' '}
          <ColorCircle color={info.getValue() || ''} size="sm" />
        </div>
      ),
      enableSorting: false,
    }),
    columnHelper.accessor('eye_color', {
      header: () => 'Eye Color',
      cell: (info) => (
        <div className="flex items-center gap-1">
          {info.getValue()}{' '}
          <ColorCircle color={info.getValue() || ''} size="sm" />
        </div>
      ),
      enableSorting: false,
    }),
    columnHelper.accessor('hair_color', {
      header: () => 'Hair Color',
      cell: (info) => (
        <div className="flex items-center gap-1">
          {info.getValue()}{' '}
          <ColorCircle color={info.getValue() || ''} size="sm" />
        </div>
      ),
      enableSorting: false,
    }),
  ];

  /**
   * Updates the search query with the user's input
   * @param {React.ChangeEvent<HTMLInputElement>} event - The input event
   * @returns {void}
   */
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event?.target;
    setSearch(value);
  };

  /**
   * Handles the view change event by toggling the view between table and list
   * @returns {void}
   */
  const handleViewChange = () => {
    setIsTable((prev) => !prev);
  };

  const table = useReactTable({
    data: list || [],
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isError || !list) {
    return <>{error?.message}</>;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CharacterTableSearch handleChange={handleSearch} />
          <ViewSwitcher isTable={isTable} handleClick={handleViewChange} />
        </div>
        <CharacterTablePagination
          count={data?.count || 0}
          page={page}
          handleBack={handlePrev}
          handleNext={handleNext}
          handlePage={handlePage}
        />
      </div>
      {isLoading ? (
        <div
          className="bg-tertiary flex h-[300px] w-full items-center
            justify-center"
        >
          <Spinner />
        </div>
      ) : isTable ? (
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    handleClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                handleClick={() =>
                  navigate(
                    `/characters/${encodeURIComponent(row.original.url || '')}`
                  )
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <List>
          {list.map((item, index) => (
            <CharacterCard
              key={index}
              character={item}
              handleClick={() => {
                navigate(`/characters/${encodeURIComponent(item.url || '')}`);
              }}
            />
          ))}
        </List>
      )}
    </div>
  );
};
