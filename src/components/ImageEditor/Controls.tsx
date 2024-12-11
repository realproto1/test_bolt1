import React from 'react';
import { Sliders, Image, Grid as GridIcon } from 'lucide-react';

interface ControlsProps {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  snapToGrid: boolean;
  onToggleGridSnap: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  onFileChange,
  snapToGrid,
  onToggleGridSnap,
}) => {
  return (
    <div className="space-y-6 w-full max-w-md">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
          <Image className="w-5 h-5" />
          Add Image
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
          />
        </label>
        <button
          onClick={onToggleGridSnap}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            snapToGrid
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <GridIcon className="w-5 h-5" />
          Grid Snap
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-gray-600" />
          <span className="font-medium">Settings</span>
        </div>
      </div>
    </div>
  );
};