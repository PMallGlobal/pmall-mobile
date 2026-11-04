import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import CategoryHeader from '../components/CategoryHeader';
import { useVendor } from "../context/AuthContext";
import { useUser } from '../context/UserContext';
import Toast from '../utils/Toast';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import './NewProduct.css';

export default function NewProduct() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [toast, setToast] = useState(null);
  
  // Custom states for image uploads
  const [mainImage, setMainImage] = useState(null);
  const [moreImages, setMoreImages] = useState([]);
  const [uploadingImg, setUploadingImg] = useState(false);

  const { user } = useUser();
  const {
    inputValues,
    setState,
    onChangeHandler,
    setToastMsg,
    loading,
    setLoading,
    toastMsg,
    toastType,
  } = useVendor();

  // Fetch initial data
  useEffect(() => {
    const token = user?.token || localStorage.getItem("authToken");

    // Fetch Categories
    fetch("https://api.pmall.com.ng/api/v1/product-category/get-all", {
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then((result) => setCategories(result.data.categories || []))
      .catch((err) => console.log(err));

    // Fetch Brands
    fetch(`https://api.pmall.com.ng/api/v1/product-brand/get-all?store_id=${user?.user?.storeId}`, {
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then((result) => setBrands(result.data.brands || []))
      .catch((err) => console.log(err));
  }, [user]);

  // Handle Category Change & Subcategory population
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    
    const matchingCat = categories.find((cat) => cat.id == newCategory);
    setSubCategories(matchingCat?.sub_categories || []);

    // Fix the state update bug
    setState((prev) => ({
      ...prev,
      category_id: newCategory,
      sub_category_id: "" // reset subcategory when main changes
    }));
  };

  // Handle File Uploads
  const handleFileUpload = async (e, isMain = true) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImg(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("https://api.pmall.com.ng/api/v1/products/upload-file", {
        method: "POST",
        body: formData,
        headers: { Authorization: "Bearer " + localStorage.getItem("authToken") },
      });
      const data = await res.json();
      
      if (isMain) {
        setMainImage(data.url);
        setState(prev => ({ ...prev, image: data.url }));
      } else {
        setMoreImages(prev => [...prev, data.url]);
      }
    } catch (error) {
      console.error("Upload failed", error);
      setToast({ message: "Image upload failed", type: "error" });
    } finally {
      setUploadingImg(false);
    }
  };

  const removeMoreImage = (indexToRemove) => {
    setMoreImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  
  const VendorCreateProduct = async (e) => {
    e.preventDefault();
    if (!inputValues.image) {
      setToast({ message: "Please upload a main product image.", type: "error" });
      return;
    }
    setLoading(true);

    const token = user?.token || localStorage.getItem("authToken");
    if (!token) {
      setToast({ message: "You are not logged in. Please log in again.", type: "error" });
      setLoading(false);
      return;
    }

    const payload = {
      ...inputValues,
      tags: inputValues.tags || [],
      more_images: moreImages,
    };

    try {
      const response = await fetch('https://api.pmall.com.ng/api/v1/products/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Accept": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setToast({ message: "Great! Product added successfully.", type: "success" });
        setTimeout(() => window.location.href = "/products", 1500);
      } else {
        let finalMessage = "Failed to create product. Please check your inputs.";
        
        try {
          const clonedResponse = response.clone();
          
          try {
            const errorData = await response.json();
            if (typeof errorData?.message === 'string') {
              finalMessage = errorData.message;
            } 
            else if (errorData?.errors && typeof errorData.errors === 'object') {
              const firstErrorKey = Object.keys(errorData.errors)[0];
              const firstError = errorData.errors[firstErrorKey];
              finalMessage = Array.isArray(firstError) ? firstError[0] : firstError;
            }
            else if (errorData?.message && typeof errorData.message === 'object') {
              const firstErrorKey = Object.keys(errorData.message)[0];
              const firstError = errorData.message[firstErrorKey];
              finalMessage = Array.isArray(firstError) ? firstError[0] : firstError;
            }
          } catch (jsonError) {
            const textError = await clonedResponse.text();
            if (textError) finalMessage = textError;
          }
        } catch (parseError) {
          console.error("Could not parse error response:", parseError);
        }

        console.error("API Error:", finalMessage);
        setToast({ message: finalMessage, type: "error" });
      }
    } catch (error) {
      console.error('Network error:', error);
      setToast({ message: "Network error. Please check your internet connection.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="np-page">
      <Toast message={toastMsg || toast?.message} type={toastType || toast?.type} onClose={() => setToast(null)} />

      <form className="np-form" onSubmit={VendorCreateProduct}>
        
        {/* SECTION 1: Basic Info */}
        <div className="np-section">
          <h3 className="np-section-title">Basic Information</h3>
          
          <div className="np-input-group">
            <label>Product Name *</label>
            <input type="text" name="name" onChange={onChangeHandler} value={inputValues.name || ''} placeholder="e.g. Organic Shea Butter" required />
          </div>

          <div className="np-row">
            <div className="np-input-group">
              <label>Category *</label>
              <select name="category_id" onChange={handleCategoryChange} value={selectedCategory} required>
                <option value="">Select Category</option>
                {categories?.map(cat => <option value={cat.id} key={cat.id}>{cat.name}</option>)}
              </select>
            </div>

            <div className="np-input-group">
              <label>Sub Category *</label>
              <select name="sub_category_id" onChange={onChangeHandler} value={inputValues.sub_category_id || ''} disabled={!selectedCategory} required>
                <option value="">Select Sub Category</option>
                {subCategories?.map(sub => <option value={sub.id} key={sub.id}>{sub.name}</option>)}
              </select>
            </div>
          </div>

          <div className="np-input-group">
            <label>Brand *</label>
            <select name="brand_id" onChange={onChangeHandler} value={inputValues.brand_id || ''} required>
              <option value="">Select Brand</option>
              {brands?.map(brand => <option value={brand.id} key={brand.id}>{brand.name}</option>)}
            </select>
          </div>
        </div>

        {/* SECTION 2: Pricing & Stock */}
        <div className="np-section">
          <h3 className="np-section-title">Pricing & Inventory</h3>
          
          <div className="np-row">
            <div className="np-input-group">
              <label>Cost Price (₦) *</label>
              <input type="number" name="cost_price" onChange={onChangeHandler} value={inputValues.cost_price || ''} placeholder="0.00" required />
            </div>
            <div className="np-input-group">
              <label>Selling Price (₦) *</label>
              <input type="number" name="selling_price" onChange={onChangeHandler} value={inputValues.selling_price || ''} placeholder="0.00" required />
            </div>
          </div>

          <div className="np-row">
            <div className="np-input-group">
              <label>Quantity Available *</label>
              <input type="number" name="quantity" onChange={onChangeHandler} value={inputValues.quantity || ''} placeholder="e.g. 50" required />
            </div>
            <div className="np-input-group">
              <label>Weight (kg) *</label>
              <input type="number" name="weight" onChange={onChangeHandler} value={inputValues.weight || ''} placeholder="e.g. 1.5" required />
            </div>
          </div>

          <div className="np-row">
             <div className="np-input-group">
              <label>Status *</label>
              <select name="inStock" onChange={onChangeHandler} value={inputValues.inStock ?? ''} required>
                <option value="">Select Status</option>
                <option value={1}>In Stock</option>
                <option value={0}>Out of Stock</option>
              </select>
            </div>
            <div className="np-input-group">
              <label>Product Type</label>
              <select name="product_type" onChange={onChangeHandler} value={inputValues.product_type ?? ''}>
                <option value="">Select Type</option>
                <option value={1}>Single Item</option>
                <option value={0}>Combo Pack</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 3: Description & Tags */}
        <div className="np-section">
          <h3 className="np-section-title">Product Details</h3>
          
          <div className="np-input-group">
            <label>Description *</label>
            <textarea 
              name="description" 
              onChange={onChangeHandler} 
              value={inputValues.description || ''} 
              placeholder="Describe the product features, size, and benefits..."
              rows={4}
              required
            />
          </div>

          <div className="np-input-group">
            <label>Search Tags (Keywords)</label>
            <Autocomplete
              multiple
              freeSolo
              options={[]}
              value={inputValues.tags || []}
              onChange={(event, newValue) => {
                const cleanedTags = newValue.map(tag => typeof tag === 'string' ? tag.trim() : tag?.title || '').filter(Boolean);
                setState(prev => ({ ...prev, tags: cleanedTags }));
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={option} {...getTagProps({ index })} key={index} />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} placeholder="Type a tag and press Enter (e.g. Organic, Vitamin C)" variant="outlined" size="small" />
              )}
            />
          </div>
        </div>

        {/* SECTION 4: Media */}
        <div className="np-section">
          <h3 className="np-section-title">Product Images</h3>
          
          <label className="np-label">Main Image *</label>
          {mainImage ? (
            <div className="np-image-preview-box">
              <img src={mainImage} alt="Main Product" />
              <button type="button" className="np-remove-img" onClick={() => {setMainImage(null); setState(prev => ({...prev, image: ""}))}}>
                <CloseIcon fontSize="small" />
              </button>
            </div>
          ) : (
            <label className="np-upload-box">
              <CloudUploadIcon className="np-upload-icon" />
              <span>{uploadingImg ? "Uploading..." : "Tap to upload main image"}</span>
              <input type="file" accept=".jpg,.png,.jpeg" onChange={(e) => handleFileUpload(e, true)} hidden />
            </label>
          )}

          <label className="np-label" style={{marginTop: '20px', display: 'block'}}>Additional Images (Optional)</label>
          <div className="np-more-images-grid">
            {moreImages.map((img, idx) => (
              <div key={idx} className="np-image-preview-box small">
                <img src={img} alt={`View ${idx}`} />
                <button type="button" className="np-remove-img" onClick={() => removeMoreImage(idx)}>
                  <CloseIcon fontSize="small" />
                </button>
              </div>
            ))}
            
            <label className="np-upload-box small">
              <CloudUploadIcon />
              <input type="file" accept=".jpg,.png,.jpeg" onChange={(e) => handleFileUpload(e, false)} hidden />
            </label>
          </div>
        </div>

        {/* Sticky Action Bar */}
        <div className="np-sticky-footer">
          <button type="submit" className="np-submit-btn" disabled={loading || uploadingImg}>
            {loading ? "Publishing..." : "Publish Product"}
          </button>
        </div>
      </form>
    </div>
  );
}