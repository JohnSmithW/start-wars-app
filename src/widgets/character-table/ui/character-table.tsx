import { useState } from 'react';
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
import { HeightIcon } from '../../../shared/ui/height-icon';
import { WeightIcon } from '../../../shared/ui/weight-icon';
import { GenderIcon } from '../../../shared/ui/gender-icon';
import { ColorCircle } from '../../../shared/ui/color-circle';
import { CharacterTableSearch } from './character-table-search';

export const CharacterTable = () => {
  const columnHelper = createColumnHelper<Character>();
  const [search, setSearch] = useState<string>('');
  const { data, error, isLoading, isError } = useQuery(
    CharacterAPI.characterQueries.list(1, search)
  );

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
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <>{error?.message}</>;
  }

  return (
    <div className="flex flex-col gap-2">
      <CharacterTableSearch handleChange={handleSearch} />
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
            <TableRow key={row.id}>
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
