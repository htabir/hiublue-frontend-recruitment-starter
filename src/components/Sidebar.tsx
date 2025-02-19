'use client';

import BrandLogo from '@/assets/images/brand-logo.png';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import Image from 'next/image';

const sidebarWidth = 280;

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarWidth,
        height: '100vh',
        overflowY: 'auto',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid rgba(145, 158, 171, 0.12)',
          backgroundColor: '#fff',
        },
      }}
    >
      <div style={{ padding: '24px 16px 8px' }}>
        <Image src={BrandLogo} alt="Brand Logo" width={48} height={48} />
      </div>

      {/* Overview Section */}
      <List>
        <Typography
          variant="body2"
          sx={{
            fontSize: '11px',
            fontWeight: 'bold',
            color: '#919EAB',
            textTransform: 'uppercase',
            padding: '16px 0px 8px 12px',
          }}
        >
          Overview
        </Typography>

        {/* Dashboard */}
        <ListItemButton href="/">
          <ListItemIcon>
            <DashboardIcon sx={{ color: '#637381' }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ color: '#637381' }} />
        </ListItemButton>

        {/* Onboarding */}
        <ListItemButton href="/onboarding">
          <ListItemIcon>
            <ShoppingBagIcon sx={{ color: '#637381' }} />
          </ListItemIcon>
          <ListItemText primary="Onboarding" sx={{ color: '#637381' }} />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
