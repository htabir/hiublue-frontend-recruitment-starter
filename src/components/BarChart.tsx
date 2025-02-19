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
  alignItems: 'flex-start',
  flex: '1',
  padding: '24px',
  height: '416px',
  borderRadius: '16px',
  boxShadow:
    '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
});

// Styled Legend Container
const LegendContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  alignContent: 'flex-end',
  gap: '16px',
  width: '100%',
  height: '22px',
});

// Styled Legend Item
const LegendItem = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '0px',
  gap: '6px',
});

// Styled Legend Text
const LegendText = styled(Typography)({
  fontFamily: "'Public Sans', sans-serif",
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '13px',
  lineHeight: '22px',
  color: '#1C252E',
});

const barChartOptions: ApexOptions = {
  chart: { type: 'bar', height: 300, toolbar: { show: false } },
  plotOptions: {
    bar: { horizontal: false, columnWidth: '40%' },
  },
  colors: ['#007867', '#FFAB00'],
  dataLabels: { enabled: false },
  xaxis: {
    categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  yaxis: { labels: { formatter: (val) => val.toFixed(0) } },
  legend: { show: false }, // ✅ Hide ApexCharts default legend since we are using custom legend
};

const barChartSeries = [
  { name: 'Desktop', data: [40, 65, 25, 50, 55, 60, 90] },
  { name: 'Mobile', data: [30, 45, 40, 35, 25, 10, 50] },
];

const BarChart: React.FC = () => {
  return (
    <StyledCard>
      <Typography variant="h6" fontWeight="600" color="text.primary">
        Website visits
      </Typography>

      {/* Custom Legend */}
      <LegendContainer>
        <LegendItem>
          <Box
            sx={{
              width: '12px',
              height: '12px',
              backgroundColor: '#007867',
              borderRadius: '500px',
            }}
          />
          <LegendText>Desktop</LegendText>
        </LegendItem>
        <LegendItem>
          <Box
            sx={{
              width: '12px',
              height: '12px',
              backgroundColor: '#FFAB00',
              borderRadius: '500px',
              opacity: 0.8,
            }}
          />
          <LegendText>Mobile</LegendText>
        </LegendItem>
      </LegendContainer>

      {/* Chart */}
      <Box width="100%" height="100%" mt={2}>
        <Chart
          options={barChartOptions}
          series={barChartSeries}
          type="bar"
          height={300}
        />
      </Box>
    </StyledCard>
  );
};

export default BarChart;
