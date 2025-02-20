'use client';

import { AttachMoney, CalendarToday } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

// Styled Card Component
const StyledCard = styled(Card)({
  margin: '20px auto',
  maxWidth: '720px',
  background: '#FFFFFF',
  boxShadow:
    '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
  borderRadius: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

// Styled Header
const Header = styled(Box)({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  padding: '24px 16px 24px 24px',
  gap: '16px',
  width: '100%',
  height: '102px',
  borderBottom: '1px solid rgba(145, 158, 171, 0.2)',
});

const StyledButton = styled(Button)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0px 16px',
  gap: '8px',
  width: '111px',
  minWidth: '64px',
  height: '48px',
  background: '#1C252E',
  borderRadius: '8px',
  color: '#FFFFFF',
  fontFamily: "'Public Sans', sans-serif",
  fontWeight: 700,
  fontSize: '15px',
  lineHeight: '26px',
  textTransform: 'none',
  '&:hover': {
    background: '#161D26',
  },
});

// Form Data Interface
interface FormData {
  planType: string;
  additions: string[];
  user: string;
  expired: string;
  price: string;
}

const CreateOffer: React.FC = () => {
  const { control, register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      planType: 'Monthly',
      additions: ['Refundable'],
      user: 'Jason Momoa',
      expired: '03 May 2023',
      price: '',
    },
  });

  const onSubmit = (data: FormData) => console.log('Form Data:', data);

  return (
    <>
      <StyledCard>
        {/* Header */}
        <Header>
          <Box width="100%">
            <Typography variant="h6" fontWeight="600">
              Create Offer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Send onboarding offer to new user
            </Typography>
          </Box>
        </Header>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          px={3}
          py={3}
          width="100%"
        >
          {/* Plan Type */}
          <Box mb={2}>
            <Typography fontWeight="600" mb={1}>
              Plan Type
            </Typography>
            <Controller
              name="planType"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field} row>
                  <FormControlLabel
                    value="Pay As You Go"
                    control={<Radio />}
                    label="Pay As You Go"
                  />
                  <FormControlLabel
                    value="Monthly"
                    control={<Radio />}
                    label="Monthly"
                  />
                  <FormControlLabel
                    value="Yearly"
                    control={<Radio />}
                    label="Yearly"
                  />
                </RadioGroup>
              )}
            />
          </Box>

          {/* Additions */}
          <Box mb={2}>
            <Typography fontWeight="600" mb={1}>
              Additions
            </Typography>
            <Box display="flex" gap={2}>
              <FormControlLabel
                control={
                  <Checkbox {...register('additions')} value="Refundable" />
                }
                label="Refundable"
              />
              <FormControlLabel
                control={
                  <Checkbox {...register('additions')} value="On demand" />
                }
                label="On demand"
              />
              <FormControlLabel
                control={
                  <Checkbox {...register('additions')} value="Negotiable" />
                }
                label="Negotiable"
              />
            </Box>
          </Box>

          {/* User Selection */}
          <Box mb={2}>
            <Typography fontWeight="600" mb={1}>
              User
            </Typography>
            <Controller
              name="user"
              control={control}
              render={({ field }) => (
                <Select {...field} fullWidth>
                  <MenuItem value="Jason Momoa">Jason Momoa</MenuItem>
                  <MenuItem value="Chris Hemsworth">Chris Hemsworth</MenuItem>
                  <MenuItem value="Robert Downey Jr.">
                    Robert Downey Jr.
                  </MenuItem>
                </Select>
              )}
            />
          </Box>

          {/* Expired Date */}
          <Box mb={2}>
            <Typography fontWeight="600" mb={1}>
              Expired
            </Typography>
            <TextField
              fullWidth
              {...register('expired')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <CalendarToday fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Price */}
          <Box mb={2}>
            <Typography fontWeight="600" mb={1}>
              Price
            </Typography>
            <TextField
              fullWidth
              placeholder="Price"
              {...register('price')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
      </StyledCard>

      <Box
        sx={{
          margin: '20px auto',
          maxWidth: '720px',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <StyledButton>Send Offer</StyledButton>
      </Box>
    </>
  );
};

export default CreateOffer;
