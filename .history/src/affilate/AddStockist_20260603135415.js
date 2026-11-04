import React, { useState } from 'react'
import CategoryHeader from '../components/CategoryHeader'
import { useVendor } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import Toast from '../utils/Toast';

export default function AddStockist() {
    const [toast, setToast] = useState()

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
      const [selectedState, setSelectedState] = useState('');
      const [selectedCity, setSelectedCity] = useState('');
        const cities = selectedState ? nigeriaStatesAndCities[selectedState] || [] : [];

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

      const user = useUser();
      console.log(user?.user)

    const handleAddStockist = async(e) => {
        inputValues.country = "Nigeria";
        if (e) {
          e.preventDefault(); 
          setLoading(true)
        try {
          const response = await fetch('https://api.pmall.com.ng/api/v1/stockists/store', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/json",
                Authorization: "Bearer " + localStorage.getItem("authToken"),
              },
              body:JSON.stringify(inputValues)
          });
          console.log(inputValues)
          if (response.ok) {
            const data = await response.json();
            setToastMsg("Great! Stockist added successfully");
            setToastType("success")
            setInterval(() => {
              setToastMsg("");
            }, 5000);
            setLoading(false)
            console.log(data)
            window.location.href = "/affiliate/my-stockists";
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
  return (
    <div className='new-product edit-profile '>
        <Toast message={toastMsg} type={toastType} onClose={() => setToast(null)} />
        <CategoryHeader title="Add Stockist" image="true" />

        <form action="" className="new flex flex-col g-20 w-full" onSubmit={handleAddStockist}>
            <div className="pos-rel">
                <label className="abs py-10">  Name </label>
                <input
                    type="text"
                    name="name"
                    className="first-name form-control w-full"
                    onChange={onChangeHandler}
                    value={inputValues.name }
                    placeholder="ROY"
                />
            </div>

            <div className="pos-rel phone">
                <label className="abs py-10"> Email</label>
                <input
                    type="email"
                    name="email"
                    className="form-control w-full"
                    onChange={onChangeHandler}
                    value={inputValues.email}
                    placeholder="mail@gmail.cm"
                    autoComplete="false"
                />
            </div>
            
            <div className="pos-rel">
                <label className="abs py-10">Phone </label>
                <input
                    type="text"
                    name="phone"
                    className="first-name form-control w-full"
                    onChange={onChangeHandler}
                    value={inputValues.phone}
                    placeholder="09188771514"
                />
            </div>

            <div className="pos-rel phone">
                <label className="abs py-10"> Address </label>
                <input
                    type="text"
                    name="address"
                    className="form-control w-full"
                    onChange={onChangeHandler}
                    value={inputValues.address}
                    placeholder="Address"
                    autoComplete="false"
                />
            </div>
            
            <div className="pos-rel phone">
                <label className="abs py-10"> Country </label>
                <input
                    type="text"
                    name="country"
                    className="form-control w-full"
                    onChange={onChangeHandler}
                    value={"Nigeria"}
                    placeholder="Country"
                    autoComplete="false"
                    disabled
                />
            </div>
            <div className="pos-rel phone">
                <label className="abs py-10"> State </label>
                <select
                    id="state"
                    name= "state"
                    className="form-control w-full"
                    value={selectedState}
                    onChange={(e) => {
                    setSelectedState(e.target.value);
                    setState(prev => ({ ...prev, [e.target.name]: e.target.value }));
                    setSelectedCity('');
                    }}
                    required
                >
                    <option value="">Select State</option>
                    {allStates.map((state) => (
                    <option key={state} value={state}>
                        {state}
                    </option>
                    ))}
                </select>
            </div>

            <div className="pos-rel phone">
                <label className="abs py-10"> City </label>
                <select id="city"  name="city" required disabled={!selectedState}
                 onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setState(prev => ({ ...prev, [e.target.name]: e.target.value }));
                    }}
                >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                    ))}
                </select>
            </div>
                
                <div className='flex g-40 justsb w-full mt-20 '> 
                    <button
                        className="login-btn login w-full"
                        // disabled={loading}
                        type="submit"
                        // onClick={handleLogin}
                        >
                        {/*  {loading ? <ButtonLoader /> : "Login"} */}
                        Register
                    </button>
                    <button
                        className="login-btn cancel w-full"
                        // disabled={loading}
                        type="submit"
                        // onClick={handleLogin}
                        >
                        Close
                    </button>
                </div>
        </form>
    </div>
  )
}
