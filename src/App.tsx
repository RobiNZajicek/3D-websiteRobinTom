// File: App.tsx
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SharedLayout from './pages/SharedLayout';
import Home from './components/Home/Home';
import ThreeD from './pages/ThreeD/ThreeD';
import Leading from './pages/Leanding/Leading';
import View from './components/View/View'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Leading />} />
          <Route path="/3D" element={<ThreeD />} />
          <Route path="/View" element={<View/>} />
        </Route>
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
