import { BrowserRouter, Route, Routes as RouterRoutes } from 'react-router-dom';
import { Layout } from './components/layout';
import { AboutPage } from './pages/about';
import { HomePage } from './pages/home';

export function Routes() {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </RouterRoutes>
    </BrowserRouter>
  );
}