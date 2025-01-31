import { useEffect, useState } from 'react';
import { getHexColor } from '../lib/getHexColor';

interface IColorCircleProps {
  color: string;
  size?: string;
}

export const ColorCircle: React.FC<IColorCircleProps> = ({
  color,
  size = 'md',
}) => {
  const [hexColor, setHexColor] = useState<string | null>(null);

  useEffect(() => {
    setHexColor(getHexColor(color));
  }, [color]);

  if (!hexColor) {
    return null;
  }

  if (color === 'n/a') return null;

  return (
    <div
      style={{
        backgroundColor: hexColor,
      }}
      className={`border-light-grey rounded-full border-1
        ${size === 'sm' ? 'size-3' : 'size-4'}`}
    ></div>
  );
};
