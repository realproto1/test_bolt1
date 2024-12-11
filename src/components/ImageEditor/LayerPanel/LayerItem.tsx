import React from 'react';
import { Eye, EyeOff, Lock, Unlock, Trash2 } from 'lucide-react';
import { Layer } from '../../../types/editor';

interface LayerItemProps {
  layer: Layer;
  isActive: boolean;
  onSelect: () => void;
  onToggleVisibility: () => void;
  onToggleLock: () => void;
  onDelete: () => void;
}

export const LayerItem: React.FC<LayerItemProps> = ({
  layer,
  isActive,
  onSelect,
  onToggleVisibility,
  onToggleLock,
  onDelete,
}) => {
  return (
    <div
      className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
        isActive ? 'bg-blue-50' : 'hover:bg-gray-50'
      }`}
      onClick={onSelect}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleVisibility();
        }}
        className="p-1 hover:bg-gray-200 rounded"
      >
        {layer.visible ? (
          <Eye className="w-4 h-4" />
        ) : (
          <EyeOff className="w-4 h-4" />
        )}
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleLock();
        }}
        className="p-1 hover:bg-gray-200 rounded"
      >
        {layer.locked ? (
          <Lock className="w-4 h-4" />
        ) : (
          <Unlock className="w-4 h-4" />
        )}
      </button>

      <span className="flex-grow">{layer.type}</span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="p-1 hover:bg-red-100 rounded"
      >
        <Trash2 className="w-4 h-4 text-red-500" />
      </button>
    </div>
  );
};