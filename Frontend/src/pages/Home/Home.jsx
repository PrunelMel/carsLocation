import CarListing from "../../components/CarListing";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const nomClient = localStorage.getItem("nomClient");
    if (nomClient) {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <CarListing />
    </>
  );
};

export default Home;