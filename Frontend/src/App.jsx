import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import AgentLayout from './layouts/AgentLayout';
import ClientLayout from "./layouts/ClientLayout";
import Board from './pages/Admin/Board';
import Agents from './pages/Admin/Agents';
import Parking from './pages/Admin/Parking';
import Locations from './pages/Admin/Locations';
import Login from './pages/Login';          // ← page unique de login
import AgentBoard from './pages/Agent/AgentBoard';
import AgentReservations from './pages/Agent/AgentReservations';
import AgentParkingVehicles from './pages/Agent/AgentParkingVehicles';
import Home from './pages/Home/Home';
import CarListing from './components/CarListing';
import ClientLogin from './pages/ClientLogin';
import Reservation from './pages/Reservation';
import { use, useEffect } from 'react';
import { useNavigation } from 'react-router-dom';
function RequireAuth({ role, children }) {
  const userRole = localStorage.getItem('userRole');
  if (!userRole) return <Navigate to="/login" replace />;
  if (userRole !== role) return <Navigate to={userRole === 'admin' ? '/admin' : '/agent'} replace />;
  return children;
}

function ClientAuth({children}) {
  const clientRole = localStorage.getItem('clientRole');
  if (!clientRole) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  const userRole = localStorage.getItem('userRole');
  

  return (
    <Routes>
      {/* Redirection racine */}
      <Route
        path="/"
        element={
          userRole === 'admin' ? <Navigate to="/admin" replace />
          : userRole === 'agent' ? <Navigate to="/agent" replace />
          : <Navigate to="/login" replace />
        }
      />

      <Route path="/home" element={<ClientLayout />}>
        <Route index element={<Home />} />
        <Route path="cars" element={<CarListing />}></Route>
        <Route path='login' element={<ClientLogin />}></Route>
        <Route path='mesReservations' element={<Reservation />}></Route>
      </Route>
      <Route path="/login" element={<Login />} />

      {/* Routes Admin */}
      <Route path="/admin" element={<RequireAuth role="admin"><AdminLayout /></RequireAuth>}>
        <Route index element={<Board />} />
        <Route path="agents" element={<Agents />} />
        <Route path="parking" element={<Parking />} />
        <Route path="locations" element={<Locations />} />
      </Route>

      {/* Routes Agent */}
      <Route path="/agent" element={<RequireAuth role="agent"><AgentLayout /></RequireAuth>}>
        <Route index element={<AgentBoard />} />
        <Route path="parking" element={<AgentParkingVehicles />} />
        <Route path="locations" element={<AgentReservations />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
