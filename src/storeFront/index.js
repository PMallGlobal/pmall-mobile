import { useEffect, useState } from 'react';
// import Loading from "../../utils/loading";
// import AdvertCarousel from "../../utils/adverts";

// import CategorySlider from '../../utils/categoryCarousel';
// import BrandSlider from '../../utils/brandCarousel';
import { Link } from "react-router-dom";
import Carousel from '../components/Carousel';
import ProductGrid from '../products/productGrids';
import useProductCategories from "../hooks/useProductCategories";
// import useProductBrands from "../../hooks/useBrands";

const StoreFront = () => {
    // const { productCategories, loading, error } = useProductCategories();
    // const { brands } = useProductBrands();
    const [productCategories, setProductCategories] = useState()


    const getAllCategories = () => {
        fetch("https://stage.api.pmall.com.ng/api/v1/public/products/get-all-categories",{
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            // Authorization: "Bearer " + localStorage.getItem("authToken"),
          },
        })
          .then((resp) => resp.json())
          .then((result) => {
            console.log(result);
            setProductCategories(result.data)
          })
          .catch((err) => {
            console.log(err);
          });
      };

    const categories = [
        { id: 1, name: 'Wellness', icon: '/images/Group (1).png' },
        { id: 2, name: 'Fitness', icon: '/images/ion_fitness-outline.png' },
        { id: 3, name: 'Beauty', icon: '/images/makeup_5731856 1.png' },
        { id: 4, name: 'Beauty', icon: '/images/Frame 7.png' },
        { id: 5, name: 'Combo', icon: '/images/alcohol-gel_2865976 1.png' },
        { id: 6, name: 'Personal', icon: '/images/Group (1).png' },
        { id: 7, name: 'Toys', icon: '/images/Group (1).png' },
        { id: 8, name: 'Food', icon: '/images/Group (1).png' },
      ];

      useEffect(()=>{
        console.log(productCategories);
        getAllCategories()
    },[])
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
                        <div className="categories-list">
                        {productCategories?.map((category) => (
                            <div key={category.id} className="category-item">
                            <div className="category-icon">
                                <img src={category.category_image} alt={category.name} className='cat-img' />
                            </div>
                            <p className="category-name">{category.name}</p>
                            </div>
                        ))}
                        </div>
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