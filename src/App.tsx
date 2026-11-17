import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QueueProvider } from './context/QueueContext';
import { NotificationProvider } from './context/NotificationContext';
import { AppRoutes } from './routes/AppRoutes';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QueueProvider>
          <NotificationProvider>
            <AppRoutes />
          </NotificationProvider>
        </QueueProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
