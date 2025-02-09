import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toast } from 'radix-ui';
import { HomePage } from '@/pages/home';
import { ThemeProvider } from '@/shared/context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CharacterPage } from './pages/Character';

function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Toast.Provider>
          <Router basename={import.meta.env.VITE_BASE_URL || '/'}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/characters/:url" element={<CharacterPage />} />
            </Routes>
          </Router>
        </Toast.Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
