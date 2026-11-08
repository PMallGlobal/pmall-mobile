import React, { useState, useEffect } from 'react';
import './InstallPrompt.css'; 

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // 1. Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      return; 
    }

    // 2. Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // 3. Listen for the Android/Chrome install event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); 
      setDeferredPrompt(e); 
      
      const dismissed = localStorage.getItem('pmallInstallPromptDismissed'); 
      if (!dismissed) setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 4. For iOS
    if (isIosDevice) {
      const dismissed = localStorage.getItem('pmallInstallPromptDismissed'); 
      if (!dismissed) {
        setTimeout(() => setShowPrompt(true), 3000); 
      }
    }

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) return;

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User installed PMall');
      }
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pmallInstallPromptDismissed', 'true'); 
  };

  if (!showPrompt) return null;

  return (
    <div className="install-prompt-banner">
      <div className="install-content">

<img src="/pmall-logo192.png" alt="PMall Icon" className="install-icon" />
        <div className="install-text">
          <h4>Install PMall App</h4>
          {isIOS ? (
            <p>Tap <strong>Share</strong> <span style={{fontSize:'18px'}}>⎋</span> then <strong>"Add to Home Screen"</strong></p>
          ) : (
            <p>Fast, offline-ready, and right on your home screen.</p>
          )}
        </div>
      </div>
      
      <div className="install-actions">
        {!isIOS && (
          <button className="btn-install" onClick={handleInstallClick}>Install</button>
        )}
        <button className="btn-dismiss" onClick={handleDismiss}>Not now</button>
      </div>
    </div>
  );
}