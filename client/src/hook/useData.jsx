import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const useData = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  
  const getData = async (data) => {
    try {
    
      setIsError(false);
      setIsLoading(true);
      await axios.get(
        `http://localhost:3000/users`,data
        );
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };
    
    

      const updateUserProfile = async (userId, data) => {
        try {
          setIsError(false);
          setIsLoading(true);
          await axios.put(`http://localhost:3000/users/${userId}`, data);
          setIsLoading(false);
        } catch (error) {
          setIsError(true);
          setIsLoading(false);
        }
      };

      

      const deleteUserProfile = async (userId) => {
        try {
          setIsError(false);
          setIsLoading(true);
          await axios.delete(`http://localhost:3000/users/${userId}`);
          navigate("/")
          setIsLoading(false);
        } catch (error) {
          setIsError(true);
          setIsLoading(false);
        }
      };
    
  

  return {
    user,
    updateUserProfile,
    getData,
    deleteUserProfile,
    isError,
    isLoading,
  };
};

export default useData;
