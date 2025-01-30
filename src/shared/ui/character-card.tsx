import { UserIcon } from '@heroicons/react/24/solid';

interface ICharacterCardProps {
  info: {
    key: string;
    value: string;
  }[];
}

export const CharacterCard: React.FC<ICharacterCardProps> = (
  { info },
  props
) => {
  return (
    <div
      className="flex h-full w-full flex-col items-center rounded-lg bg-white
        p-2"
      {...props}
    >
      <UserIcon />

      <div className="flex flex-col items-center gap-1">
        {info.map(({ key, value }) => (
          <div key={key}>
            <p className="text-sm text-gray-500">{key}</p>
            <p className="text-lg font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
