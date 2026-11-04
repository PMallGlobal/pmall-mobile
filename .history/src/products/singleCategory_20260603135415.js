import React, { useEffect, useState,useMemo } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CategoryHeader from '../components/CategoryHeader';
import PlainProductGrid from './PlainProductGrid'; // or ProductGrid if you prefer
import SingleCategoryGrid from './SingleCategoryGrid';
import { BASE_URL } from '../utils/config';
import { useQuery } from '@tanstack/react-query';

const PRODUCTS_ENDPOINT = `${BASE_URL}/public/products/list-all`;
const CATEGORIES_ENDPOINT = `${BASE_URL}/public/products/get-all-categories`;

const SingleCategory = () => {
  const { categoryId } = useParams(); // e.g. "electronics", "fashion"
  const [category, setCategory] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { data: categories = [], isLoading: catLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      console.log("Fetching categories from API...");
      const { data } = await axios.get(CATEGORIES_ENDPOINT);
      if (!data?.data || !Array.isArray(data.data)) throw new Error("Invalid categories");
      return data.data;
    },
    staleTime: 10 * 60 * 1000,    
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,  
    refetchOnReconnect: false,  
  });

  const { data: products = [], isLoading: prodLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      console.log("Fetching products from API...");
      const { data } = await axios.get(PRODUCTS_ENDPOINT);
      if (!data?.data || !Array.isArray(data.data)) throw new Error("Invalid products");
      return data.data;
    },
    staleTime: 5 * 60 * 1000,   
  gcTime: 30 * 60 * 1000,       
  refetchOnWindowFocus: false,  
  refetchOnReconnect: false,    
  });

  
  const productsByCategory = useMemo(() => {
    const grouped = products.reduce((acc, product) => {
      if (!product.category_id) return acc;
      acc[product.category_id] = acc[product.category_id] || [];
      acc[product.category_id].push(product);
      return acc;
    }, {});

   

    return categoryId ? { [categoryId]: grouped[categoryId] || [] } : grouped;
  }, [products, categoryId]);
  const loading = catLoading || prodLoading;

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        // setLoading(true);
        const { data } = await axios.get(CATEGORIES_ENDPOINT);

        if (!data?.data || !Array.isArray(data.data)) {
          throw new Error("Invalid categories response");
        }

       
          const toSlug = (str) =>
          str
            ?.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '') // strip apostrophes & special chars
            .trim()
            .replace(/\s+/g, '-');        // spaces → hyphens

          const foundCategory = data.data.find(
          (cat) =>
            toSlug(cat.name) === categoryId ||       // "MEN'S HEALTHCARE" → "mens-healthcare"
            String(cat.id) === String(categoryId)    // 2 === "2" ✅
          );

        if (!foundCategory) {
          throw new Error("Category not found");
        }

        setCategory(foundCategory);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load category");
      } finally {
        // setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  if (loading) {
    return <div className="text-center py-20">Loading category...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-600">{error}</div>;
  }

  if (!category) {
    return <div className="text-center py-20">Category not found</div>;
  }

  return (
    <div className="category-container single">
      {/* Dynamic header with category name */}
      <CategoryHeader title={category.name} />

      <div className="flex flex-col g-40 w-100">
        {category.length == 0 ? 
        <p>No products found under this category</p> :
        <div className="flex justsb g-10" style={{ width: '100%' }}>
        {/* Pass the categoryId so PlainProductGrid shows only products from this category */}
        <SingleCategoryGrid categoryId={categoryId} />
      </div>
      }
       
      </div>
    </div>
  );
};

export default SingleCategory;