import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useData = () => {
  const navigate = useNavigate();
//   const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);


  const updateDataById = async (userId, data) => {
    try {
      setIsError(false);
      setIsLoading(true);
      await axios.put(`http://localhost:3000/users/${userId}`, data);
      setIsLoading(false);
    //   navigate("/");
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };



 
  return {
    
    user,
    updateDataById,
    isError,
    isLoading,
  };
};

export default useData;
