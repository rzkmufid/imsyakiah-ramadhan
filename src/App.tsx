import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Routes } from '@/routes';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="imsakiyah-theme">
      <Routes />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;