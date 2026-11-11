import { BASE_URL } from "./config";
const fetchProductsByCategory = async (categoryId) => {
    const endpoint = `${BASE_URL}/public/products/list-all-by-category?category_id=${categoryId}`;
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        return data.products; 
    } catch (error) {
        console.error(`Error fetching products for category ${categoryId}:`, error);
        return [];
    }
};

export default fetchProductsByCategory;