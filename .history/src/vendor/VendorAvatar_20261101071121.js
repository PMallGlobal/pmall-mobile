import React, { useState } from 'react';

export function VendorAvatar({ name, photo, size = 44 }) {
  const [imgError, setImgError] = useState(false);

  
  if (!photo || imgError) {
    // Get first letter, fallback to '?' if name is empty
    const initial = name?.trim()?.charAt(0)?.toUpperCase() || '?';

    return (
      <div 
        className="pd-vendor__avatar-fallback"
        style={{ width: size, height: size, fontSize: size * 0.4 }}
        aria-label={name}
      >
        {initial}
      </div>
    );
  }

  return (
    <img
      className="pd-vendor__avatar"
      src={photo}
      alt={name}
      style={{ width: size, height: size }}
      onError={() => setImgError(true)}
    />
  );
}