const FindCategoryByID = async (categoryId) => {
    const endpoint = "https://api.pmall.com.ng/api/v1/public/products/get-all-categories";

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }
        const categories = await response.json();
        console.log(categoryId);
        const category = categories?.data?.find(cat => cat.id === categoryId);
        // if (!category) {
        //     throw new Error(`Category with ID ${categoryId} not found`);
        // }
        console.log(category)
        return category.name;
    } catch (error) {
        console.error(`Error fetching category with ID ${categoryId}:`, error.message);
        return null; // Return null in case of an error
    }
};


export default FindCategoryByID;




// const FindCategoryByID = async (categoryId) => {
//     const endpoint = "https://api.pmall.com.ng/api/v1/public/products/get-all-categories";
//     try {
//         const response = await fetch(endpoint);
//         if (!response.ok) {
//             throw new Error("Failed to fetch categories");
//         }
//         const data = await response.json();
        
//         // Find the specific category by ID
//         return data.categories?.data.find(category => category.id === categoryId) || null;
//     } catch (error) {
//         console.error(`Error fetching category ${categoryId}:`, error);
//         return null;
//     }
// };

// export default FindCategoryByID;
