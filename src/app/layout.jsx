import React from "react";

import MyApp from "./app";
import "./global.css";
import { CustomizerContextProvider } from "./context/customizerContext";

export const metadata = {
  title: "APS Admin",
  description: "Acting Performance Studio",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <CustomizerContextProvider>
          <MyApp>{children}</MyApp>
        </CustomizerContextProvider>
      </body>
    </html>
  );
}
