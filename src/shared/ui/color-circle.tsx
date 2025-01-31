import { useEffect, useState } from 'react';
import { getHexColor } from '../lib/getHexColor';

interface IColorCircleProps {
  color: string;
  size?: string;
}

export const ColorCircle: React.FC<IColorCircleProps> = ({
  color,
  size = '4',
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
        size-${size ? size : '4'}`}
    ></div>
  );
};
