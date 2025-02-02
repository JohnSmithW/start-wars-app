import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
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

import { CharacterTableSearch } from './character-table-search';
import { CharacterTablePagination } from './character-table-pagination';
import Spinner from '@/shared/ui/spinner';
import { ViewSwitcher } from './view-switcher';
import { List } from '../../../shared/ui/list';
import { CharacterCard } from './character-card';
import { useCharacters } from '../lib/hooks/useCharacters';
import { characterColumns } from './character-table-columns';
import { CharacterTableNoResults } from './character-table-no-results';

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
  const { list, data, error, isLoading, isError } = useCharacters(page, search);
  const columns = useMemo(() => characterColumns, []);

  /**
   * Decreases the current page number by one, if the current page
   * is greater than the first page.
   * @returns {void}
   */

  const handlePrev = useCallback(() => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  }, [page]);

  /**
   * Updates the page state to the next page, if the current page is
   * not the last page.
   * @returns {void}
   */
  const handleNext = useCallback(() => {
    const pages = data ? Math.ceil(data.count / 10) : 1;
    if (page < pages) {
      setPage((prev) => prev + 1);
    }
  }, [data, page]);
  /**
   * Updates the page state to the chosen page.
   * @param {number} chosenPage - The page number to switch to.
   * @returns {void}
   */
  const handlePage = useCallback((chosenPage: number) => {
    setPage(chosenPage);
  }, []);

  /**
   * Updates the search query with the user's input
   * @param {React.ChangeEvent<HTMLInputElement>} event - The input event
   * @returns {void}
   */
  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event?.target;
      setPage(1);
      setSearch(value);
    },
    []
  );

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
      ) : isTable && list.length ? (
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

      {!isLoading && !list.length && <CharacterTableNoResults />}
    </div>
  );
};
