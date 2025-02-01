import { useSound } from '@/shared/lib/hooks/use-sound';
import { ThemeToggleLightsaber } from './theme-toggle-lightsaber';
import { useTheme } from '@/shared/context';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { play } = useSound('/sounds/click.mp3', { volume: 0.5 });

  return (
    <ThemeToggleLightsaber
      handleClick={() => {
        play();
        toggleTheme();
      }}
      theme={theme}
    />
  );
};
