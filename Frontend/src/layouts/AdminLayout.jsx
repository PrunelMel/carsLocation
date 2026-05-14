
import { Outlet } from 'react-router-dom';


const AdminLayout = () => {
  return (
    <div className="admin-container min-h-screen">
      <main className="mx-auto max-w-screen-2xl">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;