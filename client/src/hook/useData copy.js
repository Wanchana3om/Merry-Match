import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useData = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const createRegister = async (data) => {
    try {
      setIsError(false);
      setIsLoading(true);
      await axios.register(`http://localhost:4000/registers`, data);
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };


  return {
    createRegister,
    isError,
    isLoading,
  };
};

export default useRegisters;

