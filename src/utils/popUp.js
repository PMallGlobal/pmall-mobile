import { useEffect } from "react";
import moment from "moment";
import { motion } from "framer-motion";
import PackageName from "./accountPackages"
import { X } from "lucide-react";

const Popup = ({ isOpen, onClose, user, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" style={{position: 'absolute', width: '25%', top: 65, right: 0}}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md p-10"
      >
        <div className="flex jspbtw items-center mb-4" style={{justifyContent: 'space-between'}}>
          <h2 className="text-lg font-semibold">{user.fname} {user.lname}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <div>{children}</div>
        <div>
        {user ? (
        <>
        <div className="transaction-table sgdfhhjsd mt-20">
          <div className="row">
          <div className="cell">Account Type</div>
            <div className="cell">{user.user_type} </div>
            </div>
            {user.user_type === "Vendor" && (
              <>
            <div className="row">
            <div className="cell">Store Name </div>
            <div className="cell">{user.store_name}</div>
          </div>
          <div className="row">
          <div className="cell">Store URL </div>
          <div className="cell">https://pmall.com.ng/{user.store_url}</div>
        </div>
        </>
          )}
            <div className="row">
            <div className="cell">Username</div>
            <div className="cell">{user.username}</div>
          </div>
          <div className="row">
          <div className="cell">Referral ID</div>
            <div className="cell">{user.my_ref_id} </div>
            </div>
            <div className="row">
            <div className="cell">Email</div>
            <div className="cell">{user.email}</div>
          </div>
            <div className="row">
            <div className="cell">Telephone </div>
            <div className="cell">{user.phone}</div>
          </div>
          <div className="row">
            <div className="cell">Member Since</div>
            <div className="cell">
                {moment(user.created_at).format("DD MMM YYYY")}
        </div>
          </div>
          <div className="row">
            <div className="cell">Direct Referrals</div>
            <div className="cell">{user.all_downline.length}</div>
          </div>
          <div className="row">
            <div className="cell">Package</div>
            <div className="cell">
              <PackageName id={user.package_id} type={user.user_type} />
            </div>
          </div>
      </div>
                    </>
                ) : (
                    <p>Loading user details...</p>
                )}
        </div>
      </motion.div>
    </div>
  );
};

export default Popup;

