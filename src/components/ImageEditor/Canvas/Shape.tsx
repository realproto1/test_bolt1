import React from 'react';
import { Shape as ShapeType, Position } from '../../../types/editor';

interface ShapeProps {
  shape: ShapeType;
  position: Position;
  isSelected?: boolean;
}

export const Shape: React.FC<ShapeProps> = ({ shape, position, isSelected }) => {
  const getShapePath = () => {
    switch (shape.type) {
      case 'rectangle':
        return (
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={shape.fill}
            stroke={shape.stroke}
            strokeWidth={shape.strokeWidth}
          />
        );
      case 'circle':
        return (
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill={shape.fill}
            stroke={shape.stroke}
            strokeWidth={shape.strokeWidth}
          />
        );
      case 'triangle':
        return (
          <polygon
            points="50%,0 100%,100% 0,100%"
            fill={shape.fill}
            stroke={shape.stroke}
            strokeWidth={shape.strokeWidth}
          />
        );
      default:
        return null;
    }
  };

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{
        outline: isSelected ? '2px solid #3b82f6' : 'none',
      }}
    >
      {getShapePath()}
    </svg>
  );
};