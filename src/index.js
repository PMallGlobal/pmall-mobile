import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { VendorSignupProvider } from './context/VendorSignupContext';
import { BrowserRouter } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import "leaflet/dist/leaflet.css";

import * as serviceWorkerRegistration from './serviceWorkerRegistration'; 

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,   
      gcTime: 1000 * 60 * 30,  
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserProvider>
          <AuthProvider>
            <VendorSignupProvider>
              <App />
            </VendorSignupProvider>
          </AuthProvider>
        </UserProvider>
      </BrowserRouter>
      
    </QueryClientProvider>
  </React.StrictMode>
);

// 2. REGISTER THE SERVICE WORKER
// This will enable the PWA install prompt and offline capabilities
serviceWorkerRegistration.register(); 

reportWebVitals();