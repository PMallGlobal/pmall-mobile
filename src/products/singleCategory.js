import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CategoryHeader from '../components/CategoryHeader';
import PlainProductGrid from './PlainProductGrid'; // or ProductGrid if you prefer
import SingleCategoryGrid from './SingleCategoryGrid';

const CATEGORIES_ENDPOINT = "https://stage.api.pmall.com.ng/api/v1/public/products/get-all-categories";

const SingleCategory = () => {
  const { categorySlug } = useParams(); // e.g. "electronics", "fashion"
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(CATEGORIES_ENDPOINT);

        if (!data?.data || !Array.isArray(data.data)) {
          throw new Error("Invalid categories response");
        }

        // Find the category that matches the slug in the URL
        // Assuming your API returns a field like `name` or `slug`
        const foundCategory = data.data.find(
          (cat) =>
            cat.name?.toLowerCase().replace(/\s+/g, '-') === categorySlug || // "Fashion Wear" → "fashion-wear"
            cat.slug === categorySlug ||
            cat.name?.toLowerCase() === categorySlug
        );

        if (!foundCategory) {
          throw new Error("Category not found");
        }

        setCategory(foundCategory);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load category");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categorySlug]);

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
        <div className="flex justsb g-10" style={{ width: '100%' }}>
          {/* Pass the categoryId so PlainProductGrid shows only products from this category */}
          <SingleCategoryGrid categoryId={category.id} />
        </div>
      </div>
    </div>
  );
};

export default SingleCategory;