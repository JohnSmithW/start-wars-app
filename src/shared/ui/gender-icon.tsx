import { FemaleIcon } from './female-icon';
import { MaleIcon } from './male-icon';

interface iGenderIconProps {
  gender: string | null;
  fill: string;
}
export const GenderIcon: React.FC<iGenderIconProps> = ({ gender, fill }) => {
  if (gender)
    return (
      <div>
        {gender === 'male' ? (
          <MaleIcon fill={fill} />
        ) : (
          <FemaleIcon fill={fill} />
        )}
      </div>
    );
};
