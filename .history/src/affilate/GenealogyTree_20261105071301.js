import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Person4Icon from '@mui/icons-material/Person4';
import { copyToClipboard } from "../utils/copyTextToClipboard";
import Loading from "../utils/loading";
import moment from "moment";
import Toast from "../utils/Toast";
import { BASE_URL } from "../utils/config";
import Popup from "../utils/popUp";
import CategoryHeader from "../components/CategoryHeader";
import UserAvatar from "../utils/UserAvatar";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import './GenealogyTree.css';

export default function GenealogyTree() {
  const { user } = useUser();
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allDownlines, setAllDownlines] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hoveredUser, setHoveredUser] = useState(null);
  const [copied, setCopied] = useState(false);

  const getMyNetwork = () => {
    setLoading(true);
    fetch(`${BASE_URL}/profile/hierarchy-all-downline`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
        Authorization: "Bearer " + user?.token,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        setAllDownlines(result?.data?.allDownline || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleCopy = () => {
    if (!user?.refId) {
      setToast({ message: "No referral ID found!", type: "error" });
      setTimeout(() => setToast(null), 3000);
      return;
    }
    copyToClipboard(`https://app.pmall.com.ng/auth/app/Signup?refLink=${user.refId}`, (message, type) => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3000);
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (user?.token) getMyNetwork();
  }, [user?.token]);

  
  const countTotalDownlines = (persons) => {
    let count = 0;
    const countRecursive = (userList) => {
      if (!userList || userList.length === 0) return;
      userList.forEach((u) => {
        count++;
        if (u.all_downline?.length > 0) countRecursive(u.all_downline);
      });
    };
    countRecursive(persons);
    return count;
  };

  const directDownlines = allDownlines?.length || 0;
  const totalDownlines = countTotalDownlines(allDownlines);
  const indirectDownlines = totalDownlines - directDownlines;

  return (
    <div className="gt-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <CategoryHeader title="Genealogy Tree" image="true" />

      <div className="gt-summary-card">
        <div className="gt-summary-header">
          <div>
            <p className="gt-label">My Referral ID</p>
            <div className="gt-ref-id" onClick={handleCopy}>
              <span>{user?.refId}</span>
              {copied ? <CheckCircleIcon className="text-green" /> : <ContentCopyIcon className="text-white" />}
            </div>
          </div>
          <div className="gt-badge">{user?.accountType}</div>
        </div>

        <div className="gt-stats-grid">
          <div className="gt-stat">
            <p>Direct</p>
            <h3>{directDownlines}</h3>
          </div>
          <div className="gt-stat border-left">
            <p>Indirect</p>
            <h3>{indirectDownlines}</h3>
          </div>
          <div className="gt-stat border-left">
            <p>Total Network</p>
            <h3>{totalDownlines}</h3>
          </div>
        </div>
        <p className="gt-member-since">Member since {moment(user?.regDate).format("DD MMM YYYY")}</p>
      </div>
      <div className="gt-tree-section">
        <div className="gt-section-title">
          <AccountTreeIcon className="text-purple" />
          <h3>Direct Referrals</h3>
        </div>

        {loading ? (
          <Loading loading={loading} />
        ) : allDownlines?.length === 0 ? (
          <div className="gt-empty-state">
            <Person4Icon style={{ fontSize: 60, color: '#d1d5db' }} />
            <p>You don't have any direct referrals yet.</p>
            <button onClick={handleCopy} className="gt-invite-btn">Invite Someone</button>
          </div>
        ) : (
          <div className="gt-timeline">
            {allDownlines.map((downline, index) => {
              const displayName = downline.user_type === "Vendor" ? downline.store_name : downline.username;
              const isLast = index === allDownlines.length - 1;

              return (
                <div className="gt-timeline-item" key={downline.id} onClick={() => { setHoveredUser(downline); setIsPopupOpen(true); }}>
                   {!isLast && <div className="gt-timeline-line"></div>}
                  
                  <div className="gt-node-avatar">
                    <UserAvatar name={downline.fname || displayName} size={44} />
                  </div>
                  <div className="gt-node-card">
                    <div className="gt-node-info">
                      <h4 className="gt-node-name">{displayName || "Unknown User"}</h4>
                      <p className="gt-node-ref">{downline.my_ref_id}</p>
                    </div>
                    <div className={`gt-node-role ${downline.user_type.toLowerCase()}`}>
                      {downline.user_type}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Popup user={hoveredUser} isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
}