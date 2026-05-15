import CarListing from "../../components/CarListing";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Utiliser nomClient (la clé réellement stockée au login)
    const nomClient = localStorage.getItem("nomClient");
    if (nomClient) {
      navigate("/home/mesReservations");
    }
  }, []);

  return (
    <>
      <CarListing />
    </>
  );
};

export default Home;