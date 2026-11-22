import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { QueueProvider } from './context/QueueContext';
import { NotificationProvider } from './context/NotificationContext';
import { AppRoutes } from './routes/AppRoutes';

export function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <QueueProvider>
            <NotificationProvider>
              <AppRoutes />
            </NotificationProvider>
          </QueueProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
