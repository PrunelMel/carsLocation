import { Outlet } from 'react-router-dom'
import NavBar from '../components/HomeNavBar'
import Footer from '../components/HomeFooter'
function ClientLayout() {

  return (
    <div className="min-h-screen w-full bg-slate-500 flex flex-col overflow-x-hidden">
      <NavBar />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default ClientLayout;
