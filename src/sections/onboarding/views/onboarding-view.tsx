

import CreateOfferForm from "@/components/Onboarding/OnboardingForm";
import { Box, Toolbar, Typography } from "@mui/material";
import { junit } from "node:test/reporters";

export default function OnboardingView() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        // width: { sm: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      <Toolbar />
      <Box style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <CreateOfferForm/>
      </Box>
    </Box>
  );
}
