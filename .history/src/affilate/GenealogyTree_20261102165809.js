import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Person4Icon from '@mui/icons-material/Person4';
import { copyToClipboard } from "../utils/copyTextToClipboard";
import Loading from "../utils/loading";
import moment from "moment";
import Toast from "../utils/Toast"
import { BASE_URL } from "../utils/config"
import Popup from "../utils/popUp";
import CategoryHeader from "../components/CategoryHeader";
import { Link } from "react-router-dom";

function  GenealogyTree() {
    const { user } = useUser();
	  const [toast, setToast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [allDownlines, setAllDownlines] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [hoveredUser, setHoveredUser] = useState(null);

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
				console.log(result.data)
                setAllDownlines(result?.data?.allDownline || []);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

	const handleCopy = () => {
		if (!user?.refId) {
			setToast({ message: "No referral ID found!", type: "error" });
			setTimeout(() => setToast(null), 5000);
			return;
		}
	
		copyToClipboard(`https://pmall.com.ng/auth/app/Signup?refLink=${user.refId}`, (message, type) => {
			setToast({ message, type });
			setTimeout(() => setToast(null), 5000);
		});
	};
	

    const countTotalDownlines = (persons) => {
        let count = 0;
        const countRecursive = (userList) => {
            if (!userList || userList.length === 0) return;
            userList.forEach((user) => {
                count++;
                if (user.all_downline?.length > 0) {
                    countRecursive(user.all_downline);
                }
            });
        };
        countRecursive(persons);
        return count;
    };

	const countDirectDownlines = (users) => {
		return users?.length ;
	};

    const UserHierarchy = ({ allDownlines }) => {
        const renderHierarchy = (downlines) => {
            return (
                <ul>
                    {downlines?.map((user) => (
                        <li key={user.id}>
                            <a
                                className="title-case"
                                href="#"
                                title={user.fname}
                                onClick={() => {
                                    setHoveredUser(user);
                                    setIsPopupOpen(true);
                                }}
                            >
								<Person4Icon/>
								<p>{user.user_type === "Vendor" ? user.store_name : user.username}</p>

								
                                <br />
                                {`${user.my_ref_id}`}
                            </a>
                            {user.all_downline?.length > 0 && renderHierarchy(user.all_downline)}
                        </li>
                    ))}
                </ul>
            );
        };

        return <div>{allDownlines?.length > 0 ? renderHierarchy(allDownlines) : <p>No downlines found.</p>}</div>;
    };

    useEffect(() => {
        if (user?.token) {
            getMyNetwork();
        }
    }, [user?.token]);

    const totalDownlines = countTotalDownlines(allDownlines);
 const directDownlines = countDirectDownlines(allDownlines);
    return (
        <div className="geneology-tree flex flex-col g-20 ">
          {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
          <CategoryHeader title="Geneology" image="true" />
          <div className="flex flex-col g-20 w-100 vbczsds">
            <p class="flex alc" onClick={handleCopy} > My Referral ID <span className="text-muted py-5"> {user?.refId} </span> <ContentCopyIcon title="Click to copy" 
                onClick={handleCopy} 
                style={{ cursor: 'pointer', marginLeft: '8px' }} /></p>
            <p> Account Type <span className="text-muted py-5"> {user?.accountType} </span> </p>
            <p> Total Downlines <span className="text-muted py-5"> {totalDownlines} </span> </p>
            <p> Direct Referral <span className="text-muted py-5"> {directDownlines} </span> </p>
            <p> Indirect Referral <span className="text-muted py-5"> {totalDownlines - directDownlines } </span> </p>
            <p> Member Since <span className="text-muted py-5"> {moment(user.regDate).format("DD MMM YYYY")} </span> </p>
          </div>
          <div className="tree flex flex-col all-center g-40 w-full">
            <Link to="/affiliate/genealogy/profile">
              <p className="text-center flex flex-col alc" style={{ marginTop: 120 }}>
                  <Person4Icon/>
                  {user?.fname} {user?.lname}
              </p>
            </Link>
              {loading ? <Loading loading={loading}/> : <UserHierarchy allDownlines={allDownlines} />}
          </div>
          <Popup user={hoveredUser} isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      </div>
    );
}

export default GenealogyTree;