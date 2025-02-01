interface SpinnerProps {
  size?: string;
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'w-8 h-8',
  color = 'border-t-accent',
}) => {
  return (
    <div className="flex items-center justify-center" data-testid="spinner">
      <div
        className={`${size} border-secondary border-4 border-t-4 ${color}
          animate-spin rounded-full`}
      ></div>
    </div>
  );
};

export default Spinner;
