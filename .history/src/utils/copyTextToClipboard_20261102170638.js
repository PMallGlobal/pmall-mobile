export const copyToClipboard = (text, callback) => {
    // Fallback for browsers that don't support the Clipboard API
    if (!navigator.clipboard) {
      if (callback) callback("Copy not supported on this browser", "error");
      return;
    }
  
    navigator.clipboard.writeText(text)
      .then(() => {
        if (callback) callback("Referral link copied!", "success");
      })
      .catch((err) => {
        console.error("Copy failed:", err);
        if (callback) callback("Failed to copy. Please try again.", "error");
      });
  };