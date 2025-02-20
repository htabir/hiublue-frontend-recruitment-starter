'use client';

import { Box } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import StatsCard from './StatsCard';

const StatsSection: React.FC = () => {
  return (
    <Box display="flex" flexWrap="wrap" gap={3} mt="20px">
      <StatsCard
        title="Total active users"
        value="8.2k"
        change="8.2%"
        isIncrease={true}
        icon={<ArrowUpwardIcon />}
      />
      <StatsCard
        title="Total clicks"
        value="8.2k"
        change="8.2%"
        isIncrease={true}
        icon={<ArrowUpwardIcon />}
      />
      <StatsCard
        title="Total appearances"
        value="8.2k"
        change="8.2%"
        isIncrease={false}
        icon={<ArrowDownwardIcon />}
      />
    </Box>
  );
};

export default StatsSection;
