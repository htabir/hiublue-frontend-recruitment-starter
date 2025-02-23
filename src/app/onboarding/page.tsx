import Sidebar from "@/components/sidebar/Sidebar";
import OnboardingView from "@/sections/onboarding/views/onboarding-view";

export const metadata = {
  title: "Onboarding",
};

export default function Page() {
  return (
    <Sidebar>
      <OnboardingView />
    </Sidebar>
  );
}
