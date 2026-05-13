
import { Outlet } from 'react-router-dom';


const AdminLayout = () => {
  return (
    <div className="admin-container">
      
      <main>
        <Outlet /> 
      </main>
    </div>
  );
};

export default AdminLayout;