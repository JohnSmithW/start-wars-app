import { FemaleIcon } from './female-icon';
import { MaleIcon } from './male-icon';

interface iGenderIconProps {
  gender: string | null;
  fill?: string;
  size?: string;
}
export const GenderIcon: React.FC<iGenderIconProps> = ({
  gender,
  fill,
  size,
}) => {
  if (gender)
    return (
      <div>
        {gender === 'male' ? (
          <MaleIcon fill={fill} size={size} />
        ) : (
          <FemaleIcon fill={fill} size={size} />
        )}
      </div>
    );
};
