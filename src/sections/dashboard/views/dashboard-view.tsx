'use client';

import DashboardLayout from '@/components/_template/DashboardLayout';
import ChartsSection from '@/components/ChartsSection';
import DashboardHeader from '@/components/DashboardHeader';
import OfferList from '@/components/OfferList';
import StatsSection from '@/components/StatsSection';

export default function DashboardView() {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <StatsSection />
      <ChartsSection />
      <OfferList />
    </DashboardLayout>
  );
}
