"use client";
import React, { useContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeSettings } from "@/utils/theme/Theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "@/utils/i18n";
import Providers from "../redux/store/Provider";

const MyApp = ({ children }) => {
  const theme = ThemeSettings();

  return (
    <>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <Providers>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </Providers>
      </AppRouterCacheProvider>
    </>
  );
};

export default MyApp;
