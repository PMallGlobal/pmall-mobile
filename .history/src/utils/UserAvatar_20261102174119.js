import React from 'react';

const COLORS = [
  '#6d28d9', // Purple (Brand)
  '#0ea5e9', // Blue
  '#10b981', // Green
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#8b5cf6', // Violet
  '#ec4899', // Pink
];

export default function UserAvatar({ name, size = 48, className = '' }) {
  // 1. Extract the first letter
  const initial = name ? name.trim().charAt(0).toUpperCase() : '?';

  const charCode = name ? name.charCodeAt(0) : 0;
  const bgColor = COLORS[charCode % COLORS.length];

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: bgColor,
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.45, // Font scales with the avatar size
        fontWeight: '700',
        flexShrink: 0,
        userSelect: 'none',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      {initial}
    </div>
  );
}