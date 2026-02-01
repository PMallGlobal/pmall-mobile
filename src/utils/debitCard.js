import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import PackageName from "../utils/accountPackages"
import currency from "../utils/formatCurrency"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import moment from "moment";
import { copyToClipboard } from "./copyTextToClipboard";
import Toast from "./Toast"
import "../index.css";

export default function DebitCard({currentLoggedInUser}) {
  const { user } = useUser();
  const [toast, setToast] = useState(null);


  const handleCopy = () => {
		if (!user?.refId) {
			setToast({ message: "No referral ID found!", type: "error" });
			setTimeout(() => setToast(null), 5000);
			return;
		}
	
		copyToClipboard(`${user.refId}`, (message, type) => {
			setToast({ message, type });
			setTimeout(() => setToast(null), 5000);
		});
	};

  useEffect(() => {
    console.log(user);
    console.log(currentLoggedInUser);
  }, [user]);

  return (
    <>
    {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    <div className="debit_card_container">
      <div className="debit_card">
        <div className="debit_card-inner">
          <div className="debit_card_front">
            <img
              src="/map.png"
              className="map-img"
              alt="Pmall"
              style={{ opacity: "0.1" }}
            />
            <div className="">
              <div className="flex justsb">
              <img
                src="/chip.png"
                width="30px"
                alt="Pmall"
              />
              <p style={{ textTransform: "capitalize", fontSize: 12 }}>
                {currentLoggedInUser?.store_name
                  ? currentLoggedInUser?.store_name
                  : currentLoggedInUser?.fname + " " + currentLoggedInUser?.lname}
              </p>
             
              </div>
              {/* <p className="text-right" style={{ textTransform: "capitalize", fontSize: 12 }}>
            <PackageName id={currentLoggedInUser.package_id} type={currentLoggedInUser.user_type} />
             </p> */}
              <div style={{padding:10}}>
                {currentLoggedInUser?.user_type === "Affiliate" ?
                <h1 className="text-left" style={{ fontSize: 20 }}>{currency(currentLoggedInUser?.wallet?.amount)}</h1>
                :  <h1 className="text-left" style={{ fontSize: 20 }}>{currency(0)}</h1>}
                
                {currentLoggedInUser?.user_type === "Affiliate" ?
                <p style={{ color: "rgb(227 227 227 / 70%)", fontSize: 10, marginTop: 5 }}>
                  Balance on wallet
                </p> : <p style={{ color: "rgb(227 227 227 / 70%)", fontSize: 10, marginTop: 5 }}>
                  Total Sales
                </p>}
              </div>
            </div>
            <div className="card-no flex">
              <p style={{ fontSize: 18 }}  onClick={handleCopy} >{currentLoggedInUser?.my_ref_id}
              </p>
              <ContentCopyIcon title="Click to copy" 
              onClick={handleCopy} 
              style={{ cursor: 'pointer', marginLeft: '8px', color: '#ffffff8f' }} />
            </div>
            <p className="text-right m-5" style={{ textTransform: "capitalize", color: "rgb(227 227 227 / 70%)", fontSize: 12 }}>
            {currentLoggedInUser.user_type}(<PackageName id={currentLoggedInUser.package_id} type={currentLoggedInUser.user_type} />)
             </p>
            <div className="row debit_card_name">
              

              <div className="text-right">
                {/* <p>{moment(user?.regDate).add(1, "years").calendar()} </p> */}
                
                {/* <p style={{ color: "rgb(227 227 227 / 70%)" }}>Due Next</p> */}
              </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
