import Sidebar from "@/components/sidebar/Sidebar";
import PrivateRoute from "@/lib/privateRoute";
import DashboardView from "@/sections/dashboard/views/dashboard-view";

const page = () => {
  return (
    <PrivateRoute>
      <Sidebar>
        <DashboardView />
      </Sidebar>
    </PrivateRoute>
  );
};

export default page;
