import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { BASE_URL } from "./config";

const CategoryDropdown = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);

    // Fetch product categories
    const getCategories = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/public/products/get-all-categories`);
            const result = await response.json();
            if (result?.data) {
                setCategories(result.data);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    // Handles category navigation
    const handleShowCategory = (category) => {
        navigate(`/category/${category.name}`, { state: { category } });
        setMenuOpen(false);
    };

    const handleViewAllCategories = () => {
        navigate("/");
        setMenuOpen(false);
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex alc" ref={dropdownRef}>
            <div className="flex g-20 alc mr-lg">
                <div className="category">
                    <button 
                        className="category_btn" 
                        style={{ 
                            border: "2px solid #c27465", 
                            padding: 12, 
                            borderRadius: 15, 
                            fontWeight: 600,
                            width: 200 
                        }}
                        onMouseEnter={() => setMenuOpen(true)}
                    > 
                         Browse All Categories
                    </button>

                    {menuOpen && (
                        <div className="category_menu" onMouseLeave={() => setMenuOpen(false)}>
                            <div className="flex justsb">
                                <div className="category__main__menu">
                                    <ul>
                                        <li onClick={handleViewAllCategories} style={{ cursor: "pointer" }}>
                                        <span class="material-icons">keyboard_double_arrow_right</span> View All Categories
                                        </li>
                                        {loading ? (
                                            <li>Loading...</li>
                                        ) : (
                                            categories.map(category => (
                                                <li 
                                                    key={category.id} 
                                                    onClick={() => handleShowCategory(category)} 
                                                    style={{ cursor: "pointer" }}
                                                > <span class="material-icons">keyboard_double_arrow_right</span>
                                                    {category.name}
                                                </li>
                                            ))
                                        )}
                                    </ul> 
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryDropdown;
