"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LockIcon from "@mui/icons-material/Lock";
import { styled } from "@mui/system";

const drawerWidth = 260;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: "20px",
  marginLeft: drawerWidth,
  transition: "margin 0.3s",
  "@media (max-width: 600px)": {
    marginLeft: 0,
  },
}));

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigationItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Onboarding", icon: <LockIcon />, path: "/dashboard/onboarding" },
  ];

  const drawer = (
    <Box sx={{ width: drawerWidth }}>
      <Toolbar>
        <Typography variant="h6" fontWeight="bold">
          hiu
        </Typography>
      </Toolbar>
  
      <List>
        {navigationItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} href={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Topbar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "white",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Added shadow
          color: "black",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Avatar alt="User" src="/avatar.png" />
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Main sx={{ marginTop: "64px" }}>{children}</Main>
    </Box>
  );
};

export default DashboardLayout;
