import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryHeader from '../components/CategoryHeader';
import Toast from '../utils/Toast';
import ButtonLoader from '../utils/buttonLoader';

// Icons
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PublicIcon from '@mui/icons-material/Public';
import './AddStockist.css';

const nigeriaStatesAndCities = {
  Abia: ["Aba", "Umuahia", "Ohafia", "Arochukwu", "Ukwa"],
  Adamawa: ["Yola", "Mubi", "Numan", "Jimeta", "Ganye"],
  "Akwa Ibom": ["Uyo", "Eket", "Ikot Ekpene", "Oron", "Abak"],
  Anambra: ["Awka", "Onitsha", "Nnewi", "Obosi", "Otuocha"],
  Bauchi: ["Bauchi", "Azare", "Ningi", "Jama'are", "Misau"],
  Bayelsa: ["Yenagoa", "Brass", "Sagbama", "Nembe", "Kaiama"],
  Benue: ["Makurdi", "Gboko", "Katsina-Ala", "Otukpo", "Zaki Biam"],
  Borno: ["Maiduguri", "Biu", "Bama", "Gwoza", "Monguno"],
  "Cross River": ["Calabar", "Ikom", "Ogoja", "Obudu", "Ugep"],
  Delta: ["Asaba", "Warri", "Sapele", "Ughelli", "Agbor"],
  Ebonyi: ["Abakaliki", "Afikpo", "Ikwo", "Ezza", "Onueke"],
  Edo: ["Benin City", "Auchi", "Ekpoma", "Uromi", "Irrua"],
  Ekiti: ["Ado Ekiti", "Ikere", "Ise", "Ijero", "Omuo"],
  Enugu: ["Enugu", "Nsukka", "Awgu", "Udi", "Oji River"],
  Gombe: ["Gombe", "Billiri", "Kaltungo", "Bajoga", "Dukku"],
  Imo: ["Owerri", "Orlu", "Okigwe", "Awo-Omamma", "Mbaise"],
  Jigawa: ["Dutse", "Hadejia", "Kazaure", "Birnin Kudu", "Gumel"],
  Kaduna: ["Kaduna", "Zaria", "Kafanchan", "Birnin Gwari", "Kachia"],
  Kano: ["Kano", "Bichi", "Wudil", "Gaya", "Rogo"],
  Katsina: ["Katsina", "Funtua", "Daura", "Malumfashi", "Kankia"],
  Kebbi: ["Birnin Kebbi", "Argungu", "Yauri", "Zuru", "Bagudo"],
  Kogi: ["Lokoja", "Okene", "Kabba", "Anyigba", "Idah"],
  Kwara: ["Ilorin", "Offa", "Jebba", "Omu-Aran", "Patigi"],
  Lagos: ["Lagos Island", "Ikeja", "Lekki", "Ikorodu", "Badagry", "Epe", "Agege"],
  Nasarawa: ["Lafia", "Karu", "Keffi", "Akwanga", "Keana"],
  Niger: ["Minna", "Bida", "Kontagora", "Suleja", "Lapai"],
  Ogun: ["Abeokuta", "Ijebu Ode", "Ota", "Sagamu", "Ilishan-Remo"],
  Ondo: ["Akure", "Ondo", "Owo", "Ikare", "Ore"],
  Osun: ["Osogbo", "Ile-Ife", "Ilesa", "Ede", "Ikirun"],
  Oyo: ["Ibadan", "Ogbomosho", "Oyo", "Saki", "Iseyin"],
  Plateau: ["Jos", "Bukuru", "Pankshin", "Mangu", "Shendam"],
  Rivers: ["Port Harcourt", "Obio-Akpor", "Bonny", "Eleme", "Yenagoa"],
  Sokoto: ["Sokoto", "Wurno", "Gwadabawa", "Binji", "Bodinga"],
  Taraba: ["Jalingo", "Wukari", "Takum", "Zing", "Bali"],
  Yobe: ["Damaturu", "Potiskum", "Gashua", "Nguru", "Geidam"],
  Zamfara: ["Gusau", "Kaura Namoda", "Talata Mafara", "Anka", "Bakura"],
  FCT: ["Abuja", "Gwagwalada", "Kuje", "Bwari", "Gwarinpa", "Maitama"]
};

const allStates = Object.keys(nigeriaStatesAndCities).sort();

export default function AddStockist() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    country: 'Nigeria',
    state: '',
    city: ''
  });

  const [selectedState, setSelectedState] = useState('');
  const cities = selectedState ? nigeriaStatesAndCities[selectedState] || [] : [];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    // Reset city when state changes
    setFormData({ ...formData, state: state, city: '' });
  };

  const handleCityChange = (e) => {
    setFormData({ ...formData, city: e.target.value });
  };

  const handleAddStockist = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://api.pmall.com.ng/api/v1/stockists/store', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setToast({ message: "Great! Stockist added successfully", type: "success" });
        setTimeout(() => navigate('/affiliate/my-stockists'), 1500);
      } else {
        // Handle Laravel validation errors or simple messages
        let errorMsg = "Failed to add stockist. Please try again.";
        if (typeof data?.message === 'string') {
          errorMsg = data.message;
        } else if (data?.errors) {
          const firstError = Object.values(data.errors)[0];
          errorMsg = Array.isArray(firstError) ? firstError[0] : firstError;
        }
        setToast({ message: errorMsg, type: "error" });
        setLoading(false);
      }
    } catch (error) {
      console.error('Network error:', error);
      setToast({ message: "Network error. Please try again.", type: "error" });
      setLoading(false);
    }
  };

  return (
    <div className="as-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <CategoryHeader title="Add Stockist" image="true" />

      <form className="as-form" onSubmit={handleAddStockist}>
        
        {/* CARD 1: Basic Information */}
        <div className="as-card">
          <div className="as-card-header">
            <PersonOutlineIcon className="as-header-icon" />
            <h3>Basic Information</h3>
          </div>

          <div className="as-input-group">
            <label>Full Name / Store Name *</label>
            <input 
              type="text" 
              name="name" 
              onChange={handleChange} 
              value={formData.name} 
              placeholder="e.g. Roy Logistics" 
              required 
            />
          </div>

          <div className="as-input-group">
            <label>Email Address *</label>
            <input 
              type="email" 
              name="email" 
              onChange={handleChange} 
              value={formData.email} 
              placeholder="mail@gmail.com" 
              required 
            />
          </div>

          <div className="as-input-group">
            <label>Phone Number *</label>
            <input 
              type="tel" 
              name="phone" 
              onChange={handleChange} 
              value={formData.phone} 
              placeholder="e.g. 09188771514" 
              required 
            />
          </div>
        </div>

        {/* CARD 2: Location Details */}
        <div className="as-card">
          <div className="as-card-header">
            <LocationOnOutlinedIcon className="as-header-icon" />
            <h3>Location Details</h3>
          </div>

          <div className="as-input-group">
            <label>Street Address *</label>
            <input 
              type="text" 
              name="address" 
              onChange={handleChange} 
              value={formData.address} 
              placeholder="Enter full street address" 
              required 
            />
          </div>

          <div className="as-input-group">
            <label>Country</label>
            <div className="as-disabled-input">
              <PublicIcon className="as-input-icon" />
              <span>Nigeria</span>
            </div>
          </div>

          <div className="as-row">
            <div className="as-input-group">
              <label>State *</label>
              <select 
                name="state" 
                value={selectedState} 
                onChange={handleStateChange} 
                required
              >
                <option value="">Select State</option>
                {allStates.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div className="as-input-group">
              <label>City *</label>
              <select 
                name="city" 
                value={formData.city} 
                onChange={handleCityChange} 
                disabled={!selectedState}
                required
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        
        <div className="as-sticky-footer">
          <button type="button" className="as-btn-cancel" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="as-btn-submit" disabled={loading}>
            {loading ? <ButtonLoader /> : "Register Stockist"}
          </button>
        </div>

      </form>
    </div>
  );
}