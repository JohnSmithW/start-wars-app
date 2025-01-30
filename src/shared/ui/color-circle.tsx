interface IColorCircleProps {
  color: string;
}

const getColor = (color: string) => {
  const colorArray = color.split(',');

  if (colorArray[0]) {
    if (colorArray[0] === 'fair') {
      return '#f2e4b4';
    }
    return colorArray[0];
  }
};
export const ColorCircle: React.FC<IColorCircleProps> = ({ color }) => {
  return <div className={`bg-[${getColor(color)}] h-2 w-2 rounded-full`}></div>;
};
