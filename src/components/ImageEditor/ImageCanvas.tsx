import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { Layer } from '../../types/editor';
import { Grid } from './Canvas/Grid';
import { Shape } from './Canvas/Shape';

interface ImageCanvasProps {
  layers: Layer[];
  gridSize: number;
  snapToGrid: boolean;
  onLayerMove: (id: string, position: { x: number; y: number }) => void;
  activeLayerId?: string | null;
  onLayerSelect?: (id: string) => void;
}

export const ImageCanvas: React.FC<ImageCanvasProps> = ({
  layers,
  gridSize,
  snapToGrid,
  onLayerMove,
  activeLayerId,
  onLayerSelect,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLayerClick = (event: React.MouseEvent, layerId: string) => {
    event.stopPropagation();
    onLayerSelect?.(layerId);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] border-2 border-gray-200 rounded-lg overflow-hidden"
      onClick={() => onLayerSelect?.(null)}
    >
      <Grid
        size={gridSize}
        width={800}
        height={600}
        visible={snapToGrid}
      />

      {[...layers].reverse().map((layer) => (
        <Draggable
          key={layer.id}
          disabled={layer.locked}
          onDrag={(_, data) => {
            onLayerMove(layer.id, { x: data.x, y: data.y });
          }}
          grid={snapToGrid ? [gridSize, gridSize] : undefined}
          position={{x: layer.position.x, y: layer.position.y}}
          positionOffset={{x: '-50%', y: '-50%'}}
        >
          <div
            onClick={(e) => handleLayerClick(e, layer.id)}
            style={{
              position: 'absolute',
              display: layer.visible ? 'block' : 'none',
              width: layer.position.width,
              height: layer.position.height,
              cursor: layer.locked ? 'default' : 'move',
              zIndex: layer.id === activeLayerId ? 1000 : 'auto',
            }}
          >
            {layer.type === 'image' ? (
              <img
                src={layer.data.url}
                alt=""
                className="w-full h-full object-contain"
                style={{
                  filter: `
                    brightness(${layer.data.brightness}%)
                    contrast(${layer.data.contrast}%)
                    saturate(${layer.data.saturation}%)
                    ${layer.data.filter !== 'none' ? layer.data.filter + '(100%)' : ''}
                  `,
                  outline: layer.id === activeLayerId ? '2px solid #3b82f6' : 'none',
                  pointerEvents: 'none',
                }}
              />
            ) : (
              <Shape 
                shape={layer.data} 
                position={layer.position} 
                isSelected={layer.id === activeLayerId}
              />
            )}
          </div>
        </Draggable>
      ))}
    </div>
  );
};