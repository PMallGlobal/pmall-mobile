import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react'
import { useEffect } from 'react';
import Toast from '../utils/Toast';

import CategoryHeader from '../components/CategoryHeader'
import { useVendor } from "../context/AuthContext";
import { useUser } from '../context/UserContext';


export default function NewProduct() {
    // const [inputValues, setState] = useState({});
    const [categories, setCategories] = useState();
    const [brands, setBrands] = useState();
    const [subCategories, setSubCategories] = useState([]);
    const user = useUser()
    const [moreImages, setMoreImages] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [toast, setToast] = useState()

    const {
      inputValues,
      setState,
      onChangeHandler,
      setToastMsg,
      loading,
      setLoading,
      toastMsg,
      toastType,
      setToastType,
    } = useVendor();

    const top100Films = [
        { title: "Beauty" },
        { title: "Phones" },
        { title: "Gadgets" },
        { title: "Electronics", year: 2008 },
        { title: "Makeup", year: 1957 },
        { title: "Cough", year: 1993 },
        { title: " Summer", year: 1994 },
        { title: "Clothing", year: 2001 },
        { title: "Ceramics", year: 1971 },
        { title: "Footwear", year: 2007 },
        { title: "Foodstuff", year: 1976 },
        { title: "Toys", year: 1962 },
        { title: "Children", year: 1944 },
      ];

      const handleChange = (event, newValue) => {
        const selectedTags = newValue.map(tag => tag.title); 
      
        console.log("Selected tags array:", selectedTags);
      
        setState((prev) => ({
          ...prev,
          tags: selectedTags,  
        }));
      };

    
  const getCategories = () => {
    fetch("https://api.pmall.com.ng/api/v1/product-category/get-all",{
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        console.log(result);
        setCategories(result.data.categories)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBrands = () => {
    fetch("https://api.pmall.com.ng/api/v1/product-brand/get-all?store_id=" + user?.user.storeId,{
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
        Authorization: `Bearer ${user?.user.token}`
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        console.log(result);
        setBrands(result.data.brands)
      })
      .catch((err) => {
        console.log(err);
      });
  };

    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        console.log(e);
        setSelectedCategory(newCategory);
        console.log(newCategory);
        console.log(categories);
        const matchingSubCategories = categories.find((category) => category.id == newCategory) || [];
  
        console.log(matchingSubCategories);
        setSubCategories(matchingSubCategories?.sub_categories);
        console.log(matchingSubCategories)
        console.log(subCategories);
        console.log(categories)
        if(!e?.persist){
            setState(inputValues, ({...inputValues, [e?.target.name]: e?.target.value })); 
        }else {
            e?.persist();
            const target = e?.target;
      if (target?.name) {
        setState((inputValues) => ({
          ...inputValues,
          [target.name]: target.value,
        }));
        setState((prev) => ({ ...prev, category_id: newCategory }));
      }
        }
    };

    const onBrandChangeHandler = (e) => {
        if (!e?.persist) {
          setState(inputValues, {
            ...inputValues,
            [e?.target.name]: e?.target.value,
          });
        } else {
          e?.persist();
          const target = e?.target;
          if (target?.name) {
            setState((inputValues) => ({
              ...inputValues,
              [target.name]: target.value,
            }));
          }
        }
        console.log(e.target.name)
      };
  

const VendorCreateProduct = async(e) => {
    if (e) {
      e.preventDefault(); 
      setLoading(true)
      const tagsArray = inputValues.tags || []; 

      const moreImagesArray = moreImages || []; 
    
      const payload = {
        ...inputValues,
        tags: tagsArray,                   
        more_images: moreImagesArray,    
      };
      console.log("Sending payload:", payload);
    try {
      const response = await fetch('https://api.pmall.com.ng/api/v1/products/create', {
        method: 'POST',
        headers:{ 
          'Content-Type': 'application/json;charset=UTF-8', 
          "Accept": "application/json" ,
          'Authorization': `Bearer ${user?.user.token}`
        },
          body:JSON.stringify(payload)
      });
      console.log(inputValues)
      if (response.ok) {
        const data = await response.json();
        console.log('product:', data); 
        setToastMsg("Great! Product added successfully");
        setToastType("success")
        setInterval(() => {
          setToastMsg("");
        }, 5000);
        setLoading(false)
        window.location.href = "/products";
        // setNewProduct(data)

      } else {
        const error = await response.text();
        console.error('Error posting product:', error);
        setLoading(false)
        setToastMsg("Oops! there seems to be an error. Fill in correct credentials")
        setToastType("error")
        setInterval(() => {
          setToastMsg("");
 }, 3000);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }
  };


      useEffect(()=>{
        getCategories()
        getBrands()
    },[])

  return (
    <div className='new-product mb-20'>
    <Toast message={toastMsg} type={toastType} onClose={() => setToast(null)} />

        <CategoryHeader title="New Product" />
        <form action="" className="new flex flex-col g-20 w-full">
                <div className="pos-rel">
                    <label className="abs py-10"> Product Name * </label>
                    <input
                        type="text"
                        name="name"
                        className="first-name form-control w-full"
                        onChange={onChangeHandler}
                        value={inputValues.name}
                        placeholder="Enter Product name"
                    />
                </div>

                <div className="pos-rel w-full">
                    <label className="abs py-10">Category* </label>
                    <select
                        name="category_id"
                        className=" form-control w-full"
                        default="Select category"
                        onChange={handleCategoryChange}
                        >
                        {
                            categories?.map((cat)=>(
                            <option value={cat.id} key={cat.id}>{cat.name} </option>
                            ))
                        }
                         <option value="Select category" className=''></option>
                    </select>
                </div>

                <div className="pos-rel w-full">
                    <label className="abs py-10">Sub Category* </label>
                    <select
                        name="sub_category_id"
                        className="last-name form-control w-full"
                        onChange={onChangeHandler}
                        >
                        {
                            subCategories?.map((sub)=>(
                            <option value={sub.id} key={sub.id}>{sub.name} </option>
                            ))
                        }
                         <option value="Select a category"></option>
                    </select>
                </div>

                <div className="pos-rel w-full">
                    <label className="abs py-10">Brand* </label>
                    <select
                        name="brand_id"
                        className="last-name form-control w-full"
                        onChange={onBrandChangeHandler}
                        >
                        {
                            brands?.map((brand)=>(
                            <option value={brand.id} key={brand.id}>{brand.name} </option>
                            ))
                        }
                        <option value="Enter brand name"></option>
                    </select>
                </div>
                <div className="pos-rel">
                    <label className="abs py-10"> Cost Price * </label>
                    <input
                        type="number"
                        name="cost_price"
                        className="last-name form-control w-full"
                        onChange={onChangeHandler}
                        value={inputValues.cost_price }
                        placeholder="Input price"
                    />
                </div>
                <div className="pos-rel phone">
                    <label className="abs py-10"> Selling Price *</label>
                    <input
                        type="number"
                        name="selling_price"
                        className="form-control w-full"
                        onChange={onChangeHandler}
                        value={inputValues.selling_price}
                        placeholder="Input price"
                        autoComplete="false"
                    />
                </div>

                <div className="pos-rel">
                    <label className="abs py-10">Is Product available for sale?*</label>
                  <select
                  className="form-control-input "
                    name="inStock"
                    onChange={onChangeHandler}
                    value={inputValues.inStock}
                    >
                    <option value="default"> Select Product availability</option>
                    
                      <option value={1}>In Stock</option>
                      <option value={0}>Currently Out of Stock</option>
                  </select>

                </div>
                <div className="pos-rel">
                    <label className="abs py-10">Product Type</label>
                  <select
                  className="form-control-input "
                    name="product_type"
                    onChange={onChangeHandler}
                    value={inputValues.product_type}
                    >
                    <option value="default"> Select Product Type</option>
                    
                      <option value={1}>Single</option>
                      <option value={0}>Combo</option>
                  </select>

                </div>
                <div className="pos-rel">
                    <label className="abs py-10">Quantity Available * </label>
                    <input
                        type="number"
                        name="quantity"
                        className="first-name form-control w-full"
                        onChange={onChangeHandler}
                        value={inputValues.quantity}
                        placeholder="Input quantity"
                    />
                </div>
                <div className="pos-rel phone">
                    <label className="abs py-10"> Product Weight *</label>
                    <input
                        type="number"
                        name="weight"
                        className="form-control w-full"
                        onChange={onChangeHandler}
                        value={inputValues.weight}
                        placeholder="Input weight"
                        autoComplete="false"
                    />
                </div>
            <div className="pos-rel ">
                <label className="abs py-10"> Describe this product(Weight, variant, size) *</label>
                <input
                type="text"
                name="description"
                className="form-control w-full"
                onChange={onChangeHandler}
                  value={inputValues.description}
                placeholder="Enter product description"
                />
            </div>
            
            <div className="pos-rel">
                <label style={{marginBottom: 7}}>Add Product Tags </label>
                <Stack spacing={3} sx={{ width: "100%" }}>
                  <Autocomplete
                    multiple
                    freeSolo
                    id="tags-custom"
                    options={[]} 
                    value={inputValues.tags || []} 
                    onChange={(event, newValue) => {
                      const cleanedTags = newValue
                        .map(tag => (typeof tag === 'string' ? tag.trim() : tag?.title || ''))
                        .filter(tag => tag !== ''); 

                      console.log("New custom tags:", cleanedTags);

                      setState(prev => ({
                        ...prev,
                        tags: cleanedTags, 
                      }));
                    }}
                    filterSelectedOptions
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          key={index}
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Type a tag and press enter"
                        variant="outlined"
                        helperText="Press Enter after each tag"
                      />
                    )}
                  />
                </Stack>
            </div>

            <div className="pos-rel w-full">
              <label className="abs py-10">Product Image* </label>
              <div className='add-img'>
                <input
                    type="file"
                    className="form-control w-full flex all-center bg-white"
                    name="image"
                    accept=".jpg,.png,.jpeg"
                    onChange={(e) => {
                    //   if (selectedName == "") {
                    //     setAlert("Please Select a file name");
                    //     return;
                    //   }
                      const formData = new FormData();
                      const files = e.target.files;
                      files?.length && formData.append("file", files[0]);
                      //setLoading(true);
                      fetch(
                        "https://api.pmall.com.ng/api/v1/products/upload-file",
                        {
                          method: "POST",
                          body: formData,
                          headers: {
                            Authorization: "Bearer " + localStorage.getItem("authToken"),
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((data) => {
                          //setLoading(false);
                          console.log(data)
                          setState((inputValues) => ({
                            ...inputValues,
                            image: data.url, 
                          }))
                          console.log(inputValues)
                        })
                        .catch((error) => {
                          //setLoading(false);
                          console.log(error)
                        });
                    }}
                  />
              </div>
              
            </div>

            <div className="pos-rel w-full">
                  <label>More Images </label>
                  <div className='add-img'>
                    <input
                        type="file"
                        className="form-control w-full flex all-center bg-white"
                        name="more_images"
                        accept=".jpg,.png,.jpeg"
                        onChange={(e) => {
                        const formData = new FormData();
                        const files = e.target.files;
                        files?.length && formData.append("file", files[0]);
                        //setLoading(true);
                        fetch(
                            "https://api.pmall.com.ng/api/v1/products/upload-file",
                            {
                            method: "POST",
                            body: formData,
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("authToken"),
                            },
                            }
                        )
                            .then((res) => res.json())
                            .then((data) => {
                            //setLoading(false);
                            console.log(data)
                            setMoreImages([...moreImages, data.url])
                            console.log(moreImages)
                            })
                            .catch((error) => {
                            //setLoading(false);
                            console.log(error)
                            });
                        }}
                        multiple
                    />
                  </div>
                </div>
            <button className='add-pd-btn' onClick={VendorCreateProduct}>Add Product</button>
        </form>
    </div>
  )
}
