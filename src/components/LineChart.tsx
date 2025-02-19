'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Card, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ApexOptions } from 'apexcharts';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Styled Card Component
const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: '1',
  padding: '24px',
  height: '416px',
  borderRadius: '16px',
  boxShadow:
    '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
});

const lineChartOptions: ApexOptions = {
  chart: { type: 'line', height: 300, toolbar: { show: false } },
  stroke: { curve: 'smooth', width: 3 },
  colors: ['#1C252E'],
  xaxis: { categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
  yaxis: { labels: { formatter: (val) => val.toFixed(0) } },
  dataLabels: { enabled: false },
};

const lineChartSeries = [
  { name: 'Offers Sent', data: [10, 20, 40, 60, 80, 90, 60] },
];

const LineChart: React.FC = () => {
  return (
    <StyledCard>
      <Typography variant="h6" fontWeight="600" color="text.primary">
        Offers sent
      </Typography>
      <Box width="100%" height="100%" mt={2}>
        <Chart
          options={lineChartOptions}
          series={lineChartSeries}
          type="line"
          height={300}
        />
      </Box>
    </StyledCard>
  );
};

export default LineChart;
