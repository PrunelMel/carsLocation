import { Outlet } from 'react-router-dom'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'

function App() {
  return (
    <div className='min-h-screen flex flex-col'>
      <NavBar />
      <main className="flex-1 pt-[72px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App