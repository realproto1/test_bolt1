import React from 'react';
import { Layers, ChevronUp, ChevronDown } from 'lucide-react';
import { LayerItem } from './LayerItem';
import { Layer } from '../../../types/editor';

interface LayerPanelProps {
  layers: Layer[];
  activeLayerId: string | null;
  onLayerSelect: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onToggleLock: (id: string) => void;
  onDeleteLayer: (id: string) => void;
  onMoveLayer: (fromIndex: number, toIndex: number) => void;
}

export const LayerPanel: React.FC<LayerPanelProps> = ({
  layers,
  activeLayerId,
  onLayerSelect,
  onToggleVisibility,
  onToggleLock,
  onDeleteLayer,
  onMoveLayer,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Layers className="w-5 h-5" />
        <h2 className="font-semibold">Layers</h2>
      </div>
      
      <div className="space-y-2">
        {layers.map((layer, index) => (
          <div key={layer.id} className="flex items-center gap-2">
            <div className="flex flex-col">
              <button
                onClick={() => index > 0 && onMoveLayer(index, index - 1)}
                disabled={index === 0}
                className={`p-1 rounded ${index === 0 ? 'text-gray-300' : 'hover:bg-gray-100'}`}
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => index < layers.length - 1 && onMoveLayer(index, index + 1)}
                disabled={index === layers.length - 1}
                className={`p-1 rounded ${index === layers.length - 1 ? 'text-gray-300' : 'hover:bg-gray-100'}`}
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-grow">
              <LayerItem
                layer={layer}
                isActive={layer.id === activeLayerId}
                onSelect={() => onLayerSelect(layer.id)}
                onToggleVisibility={() => onToggleVisibility(layer.id)}
                onToggleLock={() => onToggleLock(layer.id)}
                onDelete={() => onDeleteLayer(layer.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};