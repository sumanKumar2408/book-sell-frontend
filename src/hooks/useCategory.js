import { useState, useEffect } from "react";
import axios from "axios";
import {BASE_URL} from '../config';

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //get cart
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/category/get-all-category`);
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
