import { Outlet } from 'react-router-dom'
import NavBar from '../components/HomeNavBar'
import Footer from '../components/HomeFooter'
function ClientLayout() {

  return (
    <div className="h-screen w-full bg-slate-500">
        
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default ClientLayout;
