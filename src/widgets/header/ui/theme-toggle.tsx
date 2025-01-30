import { ThemeToggleLightsaber } from './theme-toggle-lightsaber';
import { useTheme } from '@/shared/context';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return <ThemeToggleLightsaber handleClick={toggleTheme} theme={theme} />;
};
