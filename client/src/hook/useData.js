import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useData = () => {
  const navigate = useNavigate();
  //   const [data, setData] = useState([]);
  //   const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  // const getData = async (input) => {
  //   const { status, keywords, page } = input;
  //   try {
  //     const params = new URLSearchParams();
  //     params.append("status", status);
  //     params.append("keywords", keywords);
  //     params.append("page", page);
  //     setIsError(false);
  //     setIsLoading(true);
  //     const results = await axios.get(
  //       `http://localhost:4000/posts?${params.toString()}`
  //     );
  //     setPosts(results.data.data);
  //     setTotalPages(results.data.total_pages);
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsError(true);
  //     setIsLoading(false);
  //   }
  // };

  const createRegister = async (data) => {
    try {
      setIsError(false);
      setIsLoading(true);
      await axios.post(`http://localhost:3000/register`, data);
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  //   const deleteUser = async (userId) => {
  //     try {
  //       setIsError(false);
  //       setIsLoading(true);
  //       await axios.delete(`http://localhost:4000/users/${userId}`);
  //       const newUsers = posts.filter((A) => {
  //         return A._id !== userId;
  //       });
  //       setPosts(newUsers);
  //       setIsLoading(false);
  //     } catch (error) {
  //       setIsError(true);
  //       setIsLoading(false);
  //     }
  //   };

  //   const getUserById = async (userId) => {
  //     try {
  //       setIsError(false);
  //       setIsLoading(true);
  //       const result = await axios.get(`http://localhost:4000/users/${userId}`);
  //       setUser(result.data.data);
  //       setIsLoading(false);
  //     } catch (error) {
  //       setIsError(true);
  //       setIsLoading(false);
  //     }
  //   };

  //   const updateUserById = async (userId, data) => {
  //     try {
  //       setIsError(false);
  //       setIsLoading(true);
  //       await axios.put(`http://localhost:4000/users/${userId}`, data);
  //       setIsLoading(false);
  //       navigate("/");
  //     } catch (error) {
  //       setIsError(true);
  //       setIsLoading(false);
  //     }
  //   };

  return {
    createRegister,
    isError,
    isLoading,
    // user,
    // updateUserById,
    // getUserById,
    // deleteUser,
  };
};

export default useData;
