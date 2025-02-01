import { Character } from '../../../entities/character';
import { ColorCircle } from '../../../shared/ui/color-circle';
import { GenderIcon } from '../../../shared/ui/gender-icon';
import { HeightIcon } from '../../../shared/ui/height-icon';
import { WeightIcon } from '../../../shared/ui/weight-icon';

interface ICharacterCardProps {
  character: Character;
  handleClick?: () => void;
}

export const CharacterCard: React.FC<ICharacterCardProps> = ({
  character,
  handleClick,
}) => {
  return (
    <div
      className="bg-tertiary hover:border-muted flex cursor-pointer flex-col
        gap-4 rounded-xl border border-transparent p-5 shadow-md
        transition-shadow hover:shadow-lg"
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        {character?.birth_year && (
          <span className="text-muted text-xs">{character.birth_year}</span>
        )}

        <div className="flex items-center gap-0.5">
          <span className="text-muted text-xs">{character.gender}</span>
          <GenderIcon gender={character.gender || 'male'} fill="fill-muted" />
        </div>
      </div>

      {character?.name && (
        <h3 className="text-base text-xl">{character?.name}</h3>
      )}

      <div className="flex items-center justify-between">
        {character?.height && (
          <div className="flex items-center gap-0.5">
            <span className="text-base">{character?.height}</span>
            <HeightIcon fill="fill-muted" />
          </div>
        )}
        {character?.mass && (
          <div className="flex items-center gap-1">
            <span className="text-base">{character?.mass}</span>
            <WeightIcon fill="fill-muted" />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        {character?.hair_color && (
          <div className="flex flex-col gap-0.5">
            <span className="text-muted text-xs">Hair color</span>
            <div className="flex items-center gap-2">
              <span className="text-base">{character?.hair_color}</span>
              <ColorCircle color={character?.hair_color} />
            </div>
          </div>
        )}
        {character?.skin_color && (
          <div className="flex flex-col gap-0.5">
            <span className="text-muted text-xs">Skin color</span>
            <div className="flex items-center gap-2">
              <span className="text-base">{character?.skin_color}</span>
              <ColorCircle color={character?.skin_color} />
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center">
        {character?.eye_color && (
          <div className="flex flex-col gap-0">
            <span className="text-muted text-xs">Eye color</span>
            <div className="flex items-center gap-2">
              <span className="text-base">{character?.eye_color}</span>
              <ColorCircle color={character?.hair_color || 'n/a'} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
