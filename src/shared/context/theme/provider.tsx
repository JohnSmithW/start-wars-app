import { useEffect, useState } from 'react';
import { ThemeContext } from './context';

/**
 * ThemeProvider component to manage and apply theme changes.
 *
 * This component automatically updates the theme class on the `<body>` element
 * whenever the theme settings change. It is not mandatory to wrap your entire
 * application with this component to change the theme. Simply updating the
 * `themeSettings` in the store will apply the new theme globally.
 *
 * @param {React.ReactNode} [children] - Optional child components to render inside the provider.
 */

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.classList.toggle('dark', savedTheme === 'dark');
    document.body.dataset.theme = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.classList.toggle('dark', newTheme === 'dark');
    document.body.dataset.theme = newTheme;
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
