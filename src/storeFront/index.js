import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce'; 
import { Link } from "react-router-dom";
import Carousel from '../components/Carousel';
import ProductGrid from '../products/productGrids';
import useProductCategories from "../hooks/useProductCategories";


const StoreFront = () => {

   
  const fetchAllCategories = async () => {
        const response = await fetch("https://api.pmall.com.ng/api/v1/public/products/get-all-categories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken") || ''}`,
          },
        });
      
        if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.status}`);
        }
      
        const result = await response.json();
    
        return result.data;   
      };

      const {
        data: productCategories,   
        isPending,                   
        isFetching,
        isError,
        error,
      } = useQuery({
        queryKey: ['product-categories'],  
        queryFn: fetchAllCategories,      
        staleTime: 1000 * 60 * 10,         
        gcTime: 1000 * 60 * 60,         
        refetchOnWindowFocus: false,    
      });
    
     
    //   if (isError) {
    //     return <div>Error loading categories: {error?.message || 'Unknown error'}</div>;
    //   }


    const categories = [
        { id: 1, name: 'Wellness', icon: '/images/Group (1).png' },
        { id: 2, name: 'Fitness', icon: '/images/ion_fitness-outline.png' },
        { id: 3, name: 'Beauty', icon: '/images/makeup_5731856 1.png' },
        { id: 4, name: 'Beauty', icon: '/images/Frame 7.png' },
        { id: 5, name: 'Combo', icon: '/images/alcohol-gel_2865976 1.png' },
        { id: 6, name: 'Combo', icon: '/images/alcohol-gel_2865976 1.png' },
      ];

    return ( 
        <div className="store-container">
            {/* <Loading loading={loading} /> */}
            
            <div className="site__content__main" style={{marginTop: '5%', marginBottom: '5%'}}>
                <div class="section imgBanners style6 no-pt-section">
                    <div class="bannerContain">
                        <div class="collection-banners">
                            <Carousel />
                        </div>
                    </div>
                </div>
                <div className="categories-section">
                    <div className='flex justsb categories-title'>
                        <h3 className="">Category</h3>
                        <Link to="/category"> <p className='pointer'>See all</p> </Link>
                    </div>
                    
                    <div className="categories-container">
                        {isPending ? 
                            <div className='categories-list'>
                                {categories?.map((category) => (
                                    <div class="category-skeleton">
                                        <div class="skeleton-icon"></div>
                                        <div class="skeleton-name"></div>
                                    </div>
                                ))}
                            </div> :
                            <div className="categories-list">
                                {productCategories?.map((category) => (
                                    <Link to={`/category/${category.id}`}>
                                        <div key={category.id} className="category-item">
                                            <div className="category-icon">
                                                <img src={category.category_image} alt={category.name} className='cat-img' />
                                            </div>
                                            <p className="category-name">{category.name}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        }
                    </div>
                </div>
                    <div className='px flex flex-col g-40 w-90'>
                        <div className='flex justsb g-10' style={{width: '100%'}}>
                            <ProductGrid />
                        </div>
                    </div>
                    
                </div>

        </div>
     );
}
 
export default StoreFront;