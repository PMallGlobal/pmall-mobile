import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { BASE_URL } from "./config";

const PackageName = ({ id, type }) => {
  const user = useUser();
  const [allPackages, setAllPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllPackages = async () => {
      if (allPackages.length > 0) return; 
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/account-packages/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });
        const result = await response.json();
        if (result?.data?.packages) {
          setAllPackages(result.data.packages);
        } else {
          console.error("Invalid API response:", result);
          setAllPackages([]); 
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
        setAllPackages([]);
      }
      setLoading(false);
    };

    fetchAllPackages();
  }, [user?.token]); 

  const packageItem = allPackages.find((pkg) => pkg.id === id && pkg.type === type);

  return <span>{loading ? "Loading..." : packageItem ? packageItem.name : "Not Found"}</span>;
};

export default PackageName;
