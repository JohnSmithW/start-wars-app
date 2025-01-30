import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Character, CharacterAPI } from '@/entities/character';
import { useQuery } from '@tanstack/react-query';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
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
import { useCharacterStore } from '@/entities/character/model';

export const CharacterTable = () => {
  const navigate = useNavigate();
  const columnHelper = createColumnHelper<Character>();
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const { data, error, isLoading, isError } = useQuery(
    CharacterAPI.characterQueries.list(page, search)
  );

  const { list, setList } = useCharacterStore((state) => state);

  useEffect(() => {
    if (data?.result && !list.length) {
      const newList = [...data.result];
      setList([...newList]);
    }
  }, [data?.result, list.length, setList]);

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    const pages = data ? Math.ceil(data.count / 10) : 1;
    if (page < pages) {
      setPage((prev) => prev + 1);
    }
  };
  const handlePage = (chosenPage: number) => {
    setPage(chosenPage);
  };

  const columns = [
    columnHelper.accessor('name', {
      header: () => <div>Name</div>,
    }),
    columnHelper.accessor('height', {
      header: () => (
        <div className="flex items-center gap-1.5">
          Height <HeightIcon />
        </div>
      ),
      cell: (info) => <div>{info.getValue()} cm</div>,
    }),
    columnHelper.accessor('mass', {
      header: () => (
        <div className="flex items-center gap-1.5">
          Mass <WeightIcon />
        </div>
      ),
      cell: (info) => <div>{info.getValue()} kg</div>,
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
    }),
    columnHelper.accessor('skin_color', {
      header: () => 'Skin Color',
      cell: (info) => (
        <div>
          {info.getValue()} <ColorCircle color={info.getValue() || ''} />
        </div>
      ),
    }),
  ];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event?.target;
    setSearch(value);
  };

  const table = useReactTable({
    data: list || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !list) {
    return <>{error?.message}</>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <CharacterTableSearch handleChange={handleSearch} />
        <CharacterTablePagination
          count={data?.count || 0}
          page={page}
          handleBack={handlePrev}
          handleNext={handleNext}
          handlePage={handlePage}
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
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
                  `/characters/${encodeURIComponent(row.original.name || '')}`
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
    </div>
  );
};
