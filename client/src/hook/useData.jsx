import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const useData = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  
  const getData = async (input) => {
    const { keyword, meetingInterest,minAge, maxAge} = input;
    console.log(input);
    try {
      const params = new URLSearchParams();
      params.append("keyword", keyword);
      params.append("meeting_interest", meetingInterest);
      params.append("min_age", minAge);
      params.append("max_age", maxAge);
      
      setIsError(false);
      setIsLoading(true);
      await axios.get(
        `http://localhost:3000/users?keyword=${keyword}&meeting_interest=${meeting_interest}&min_age=${min_age}&max_age=${max_age}`
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
