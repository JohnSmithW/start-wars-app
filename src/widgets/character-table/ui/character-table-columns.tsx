// table/characterTableColumns.ts
import { createColumnHelper } from '@tanstack/react-table';
import { Character } from '@/entities/character';
import { HeightIcon } from '@/shared/ui/height-icon';
import { WeightIcon } from '@/shared/ui/weight-icon';
import { GenderIcon } from '@/shared/ui/gender-icon';
import { ColorCircle } from '@/shared/ui/color-circle';

const columnHelper = createColumnHelper<Character>();

export const characterColumns = [
  columnHelper.accessor('name', {
    header: 'Name',
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
    cell: (info) => (
      <div>
        {info.getValue() !== 'unknown'
          ? `${info.getValue()} kg`
          : info.getValue()}
      </div>
    ),
    enableSorting: true,
  }),
  columnHelper.accessor('gender', {
    header: 'Gender',
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
    header: 'Skin Color',
    cell: (info) => (
      <div className="flex items-center gap-1">
        {info.getValue() !== 'unknown' ? (
          <>
            {info.getValue()}{' '}
            <ColorCircle color={info.getValue() || ''} size="sm" />
          </>
        ) : (
          info.getValue()
        )}
      </div>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor('eye_color', {
    header: 'Eye Color',
    cell: (info) => (
      <div className="flex items-center gap-1">
        {info.getValue()}{' '}
        <ColorCircle color={info.getValue() || ''} size="sm" />
      </div>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor('hair_color', {
    header: 'Hair Color',
    cell: (info) => (
      <div className="flex items-center gap-1">
        {info.getValue()}{' '}
        <ColorCircle color={info.getValue() || ''} size="sm" />
      </div>
    ),
    enableSorting: false,
  }),
];
