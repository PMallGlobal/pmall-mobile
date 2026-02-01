import { useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_CATEGORIES_ENDPOINT || "https://api.pmall.com.ng/api/v1/public/products/get-all-categories";

const useProductCategories = () => {
  const [productCategories, setProductCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setProductCategories(result.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { productCategories, loading, error };
};

export default useProductCategories;
