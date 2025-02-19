// src/app/onboarding/page.tsx
"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Autocomplete,
  Alert,
} from '@mui/material';
import { searchUsers } from '@/services/userService';
import { sendOnboardingOffer } from '@/services/onboardingService';

// Zod schema for form validation
const onboardingSchema = z.object({
  userId: z.string().min(1, 'User selection is required'),
  offerTitle: z.string().min(3, 'Offer title is required'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

type OnboardingFormValues = z.infer<typeof onboardingSchema>;

interface UserOption {
  id: string;
  name: string;
  email: string;
}

export default function OnboardingPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
  });

  const [userOptions, setUserOptions] = useState<UserOption[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  const handleUserSearch = async (query: string) => {
    if (!query) return;
    setSearchLoading(true);
    try {
      const users = await searchUsers(query);
      setUserOptions(users);
    } catch (error) {
      console.error('Failed to search users:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const onSubmit = async (data: OnboardingFormValues) => {
    try {
      await sendOnboardingOffer(data);
      setMessage({ type: 'success', text: 'Onboarding offer sent successfully!' });
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to send onboarding offer.',
      });
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Send Onboarding Offer
      </Typography>

      {message && (
        <Alert severity={message.type} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
        {/* User Autocomplete */}
        <Autocomplete
          options={userOptions}
          getOptionLabel={(option) => `${option.name} (${option.email})`}
          filterOptions={(options) => options} // Keep options as-is (from API)
          loading={searchLoading}
          onInputChange={(_, value) => handleUserSearch(value)}
          onChange={(_, value) => setValue('userId', value?.id || '')}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select User"
              variant="outlined"
              error={!!errors.userId}
              helperText={errors.userId?.message}
            />
          )}
        />

        {/* Offer Title */}
        <TextField
          fullWidth
          label="Offer Title"
          margin="normal"
          {...register('offerTitle')}
          error={!!errors.offerTitle}
          helperText={errors.offerTitle?.message}
        />

        {/* Message */}
        <TextField
          fullWidth
          label="Message"
          margin="normal"
          multiline
          rows={4}
          {...register('message')}
          error={!!errors.message}
          helperText={errors.message?.message}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} /> : 'Send Offer'}
        </Button>
      </Box>
    </Container>
  );
}
