import React from 'react';
import { useEditorState } from './hooks/useEditorState';
import { ImageCanvas } from './components/ImageEditor/ImageCanvas';
import { Controls } from './components/ImageEditor/Controls';
import { LayerPanel } from './components/ImageEditor/LayerPanel/LayerPanel';
import { ShapeControls } from './components/ImageEditor/ShapeControls';

function App() {
  const {
    state,
    addLayer,
    updateLayerPosition,
    moveLayer,
    toggleGridSnap,
    setActiveLayer,
    toggleLayerVisibility,
    toggleLayerLock,
    deleteLayer,
  } = useEditorState();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      addLayer('image', {
        url,
        filter: 'none',
        brightness: 100,
        contrast: 100,
        saturation: 100,
      });
    }
  };

  const handleAddShape = (type: 'rectangle' | 'circle' | 'triangle') => {
    addLayer('shape', {
      type,
      fill: '#ffffff',
      stroke: '#000000',
      strokeWidth: 2,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Image Editor</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-8">
          <div className="space-y-6">
            <LayerPanel
              layers={state.layers}
              activeLayerId={state.activeLayerId}
              onLayerSelect={setActiveLayer}
              onToggleVisibility={toggleLayerVisibility}
              onToggleLock={toggleLayerLock}
              onDeleteLayer={deleteLayer}
              onMoveLayer={moveLayer}
            />
            <ShapeControls onAddShape={handleAddShape} />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <ImageCanvas
              layers={state.layers}
              gridSize={state.gridSize}
              snapToGrid={state.snapToGrid}
              onLayerMove={updateLayerPosition}
              activeLayerId={state.activeLayerId}
              onLayerSelect={setActiveLayer}
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Controls
              onFileChange={handleFileChange}
              snapToGrid={state.snapToGrid}
              onToggleGridSnap={toggleGridSnap}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;