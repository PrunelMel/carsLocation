import CarListing from "../../components/CarListing";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import HeroSection from "./HeroSection";
const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const nomClient = localStorage.getItem("nomClient");
    if (nomClient) {
      navigate("/home/mesReservations");
    }
  }, []);

  return (
    <>
      <HeroSection />
      <CarListing />
    </>
  );
};

export default Home;