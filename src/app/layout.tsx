"use client";

import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';
import { AuthProvider } from '../context/AuthContext';

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <html>
            <body>
              {children}
            </body>
          </html>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default RootLayout;
