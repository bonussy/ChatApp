// components/ThemeRegistry.tsx
'use client';

import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/utils/createEmotionCache';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/theme';
import { useServerInsertedHTML } from 'next/navigation';

const cache = createEmotionCache();

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
      dangerouslySetInnerHTML={{ __html: Object.values(cache.inserted).join('') }}
    />
  ));

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
