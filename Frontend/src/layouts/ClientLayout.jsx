import { Outlet } from 'react-router-dom'
import NavBar from '../components/HomeNavBar'
import Footer from '../components/HomeFooter'
function ClientLayout() {

  return (
    <div className='bg-gray-100 min-h-screen'>
      {<NavBar />}
      <main className="flex-1 pt-32 md:pt-16">
        <Outlet />
      </main>
      { <Footer />}
    </div>
  )
}

export default ClientLayout;
