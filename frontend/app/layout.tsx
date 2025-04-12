"use client";

import "./globals.css";
import { SocketProvider } from '../context/SocketContext';
import createEmotionCache from "@/utils/createEmotionCache";
import ThemeRegistry from "@/components/ThemeRegistry";

const clientSideEmotionCache = createEmotionCache();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Chat App</title>
      </head>
      <body className="bg-gray-100">
        {/* <CacheProvider value={clientSideEmotionCache}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <CustomCssBaseline />
              <SocketProvider>
                {children}
              </SocketProvider>
            </ThemeProvider>
          </StyledEngineProvider>
        </CacheProvider> */}
        {/* <ThemeRegistry> */}
          <SocketProvider>
            {children}
          </SocketProvider>
        {/* </ThemeRegistry> */}
      </body>
    </html>
  );
}