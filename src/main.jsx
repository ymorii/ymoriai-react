import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

// Custom Modules
import router from './routers/router.jsx';

import SnackbarProvider from './contexts/SnackbarContext.jsx';
// CSS LINK
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SnackbarProvider>
      <RouterProvider router={router} />
    </SnackbarProvider>
  </StrictMode>,
);
