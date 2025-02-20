import ProtectedRoute from '@/auth/protected-route';
import DashboardView from "@/sections/dashboard/views/dashboard-view";

export const metadata = {
    title: 'Dashboard',
};

export default function Page() {
    return (
        <ProtectedRoute>
            <DashboardView />
        </ProtectedRoute>
    );
}
