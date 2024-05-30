// src/hooks/useProtectedData.js
import { useQuery } from '@tanstack/react-query';
import axios from '../axiosConfig';

const fetchProtectedData = async () => {
  const { data } = await axios.get('/protected-route');
  return data;
};

const useProtectedData = () => {
  return useQuery(['protectedData'], fetchProtectedData);
};

export default useProtectedData;
