import React from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { Box } from '@mui/material';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flex: 1 }}>
        <Header />
        <Box sx={{ px: '32px', py: '22px' }}>{children}</Box>
      </Box>
    </Box>
  );
}

export default DashboardLayout;
