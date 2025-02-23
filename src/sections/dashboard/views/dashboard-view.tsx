import Dashboard from "@/components/deshboard/DeshboardChart";
import OfferTable from "@/components/deshboard/OfferList";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

const drawerWidth = 200;

const DashboardView = async () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      <Toolbar />
      <Dashboard></Dashboard>
      <OfferTable></OfferTable>
    </Box>
  );
};

export default DashboardView;
