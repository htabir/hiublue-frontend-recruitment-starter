'use client';

import { Card, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';

// Define prop types
interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  isIncrease: boolean;
  icon: ReactNode;
}

// Styled Card Component
const StyledCard = styled(Card)({
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '24px',
  minWidth: '343px',
  height: '148px',
  borderRadius: '16px',
  boxShadow:
    '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
});

// Main Card Component
const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  isIncrease,
  icon,
}) => {
  return (
    <StyledCard>
      <Typography variant="subtitle2" color="text.primary" fontWeight="600">
        {title}
      </Typography>

      <Typography variant="h4" fontWeight="700">
        {value}
      </Typography>

      <Box display="flex" alignItems="center" gap={1}>
        {/* Dynamic Color for Increase/Decrease */}
        <Box
          sx={{
            color: isIncrease ? '#22C55E' : '#FF5630',
            fontSize: '14px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {icon}
          {change}
        </Box>

        <Typography variant="body2" color="text.secondary">
          previous month
        </Typography>
      </Box>
    </StyledCard>
  );
};

export default StatsCard;
