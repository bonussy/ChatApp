// components/CustomCssBaseline.tsx
'use client';

import { CssBaseline, GlobalStyles } from '@mui/material';

export default function CustomCssBaseline() {
  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: 'unset', // <--- ปิด default bg ของ MUI
          },
        }}
      />
    </>
  );
}
