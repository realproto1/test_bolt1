import React from 'react';

interface GridProps {
  size: number;
  width: number;
  height: number;
  visible: boolean;
}

export const Grid: React.FC<GridProps> = ({ size, width, height, visible }) => {
  if (!visible) return null;

  return (
    <svg
      className="absolute top-0 left-0 pointer-events-none"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="grid"
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${size} 0 L 0 0 0 ${size}`}
            fill="none"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
};