import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from '@/pages/home';
import { ThemeProvider } from '@/shared/context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/items/:id" element={null} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
