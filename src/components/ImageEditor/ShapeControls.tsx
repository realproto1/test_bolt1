import React from 'react';
import { Square, Circle, Triangle } from 'lucide-react';

interface ShapeControlsProps {
  onAddShape: (type: 'rectangle' | 'circle' | 'triangle') => void;
}

export const ShapeControls: React.FC<ShapeControlsProps> = ({ onAddShape }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="font-medium">Shapes</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onAddShape('rectangle')}
          className="p-2 hover:bg-gray-100 rounded"
          title="Add Rectangle"
        >
          <Square className="w-6 h-6" />
        </button>
        <button
          onClick={() => onAddShape('circle')}
          className="p-2 hover:bg-gray-100 rounded"
          title="Add Circle"
        >
          <Circle className="w-6 h-6" />
        </button>
        <button
          onClick={() => onAddShape('triangle')}
          className="p-2 hover:bg-gray-100 rounded"
          title="Add Triangle"
        >
          <Triangle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};