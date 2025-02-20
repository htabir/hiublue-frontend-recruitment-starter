'use client';

import { Box } from '@mui/material';
import BarChart from './BarChart';
import LineChart from './LineChart';

const ChartsSection: React.FC = () => {
  return (
    <Box display="flex" flexWrap="wrap" gap={3} mt="20px">
      <BarChart />
      <LineChart />
    </Box>
  );
};

export default ChartsSection;
