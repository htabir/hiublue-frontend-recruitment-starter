import apiClient from './apiClient';

interface OnboardingRequest {
  userId: string;
  offerTitle: string;
  message: string;
}

export const sendOnboardingOffer = async (data: OnboardingRequest) => {
  const response = await apiClient.post('/onboarding/send', data);
  return response.data;
};
