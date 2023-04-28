import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useData = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [merryMatchList, setMerryMatchList] = useState([]);

  const getData = async (userId, data) => {
    try {
      setIsError(false);
      setIsLoading(true);
      await axios.get(`http://localhost:3000/users/merrymatch/${userId}`, data);
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
      navigate("/");
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };
  const merryMatch = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const response = await axios.get(`http://localhost:3000/merrylist`);
      setMerryMatchList(response.data);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const userLoveSwipeRight = async (userId, data) => {
    console.log(userId);
    console.log(data);
    try {
      setIsError(false);
      setIsLoading(true);

      await axios.put(`http://localhost:3000/merrylist/${userId}`, data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const userRejectSwipeLeft = async (userId, data) => {
    console.log(userId)
    console.log(data)
    try {
      setIsError(false);
      setIsLoading(true);
      await axios.put(`http://localhost:3000/merryreject/${userId}`, data)
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  }

  const userClearRejected = async (userId) => {
    console.log(userId)
    try {
      setIsError(false);
      setIsLoading(true);
      await axios.delete(`http://localhost:3000/merryreject/${userId}`)
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    merryMatch()
  }, [])



  return {
    user,
    updateUserProfile,
    getData,
    deleteUserProfile,
    isError,
    isLoading,
    merryMatchList,
    userLoveSwipeRight,
    userRejectSwipeLeft,
    userClearRejected,
  };
};

export default useData;
