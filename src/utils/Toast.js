import React, { useEffect, useState } from "react";
import "./toast.css"; 

const Toast = ({ message, type = "success", onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true); 

        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 500); // Delay removal for fade-out effect
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return message ? (
        <div className={`toast-message ${type} ${visible ? "show" : "hide"}`}>
            {message}
        </div>
    ) : null;
};

export default Toast;
