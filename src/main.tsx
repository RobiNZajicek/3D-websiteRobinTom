import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { MantineProvider } from '@mantine/core';

createRoot(document.getElementById('root')!).render(
  <MantineProvider
    theme={{
      /** Add any other theme overrides here if necessary */
    }}
    // forceColorScheme="dark" // Force dark mode without considering local storage or system preference
    // withGlobalStyles
    // withNormalizeCSS
  >
    <StrictMode>
      <App />
    </StrictMode>
  </MantineProvider>
);
