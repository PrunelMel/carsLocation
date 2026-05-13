import HeroSection from "./HeroSection";
import CarListing from "../../components/CarListing";
import { useNavigate } from "react-router-dom";
import { useEffect, React } from "react";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const clientRole = localStorage.getItem('clientRole');
    if (clientRole) {
      navigate('/home/mesReservations');
    }
  })
  return (
    <>
      <HeroSection />
      <CarListing />
    </>
  )
}

export default Home