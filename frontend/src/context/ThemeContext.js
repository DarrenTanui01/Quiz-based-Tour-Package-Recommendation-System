import React, { createContext, useContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: { main: '#ff9800' },
          secondary: { main: '#1976d2' },
          background: { default: '#f5f5f5', paper: '#fff' },
        }
      : {
          primary: { main: '#1976d2' },
          secondary: { main: '#ff9800' },
          background: { default: '#181c24', paper: '#232936' },
        }),
  },
  typography: {
    fontFamily: 'Montserrat, Roboto, Arial, sans-serif',
  },
});

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(localStorage.getItem('themeMode') || 'light');
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeMode() {
  return useContext(ThemeContext);
}