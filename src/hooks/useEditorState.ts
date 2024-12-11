import { useState, useCallback } from 'react';
import { EditorState, Layer, Shape, Position } from '../types/editor';
import { v4 as uuidv4 } from 'uuid';

const initialState: EditorState = {
  layers: [],
  activeLayerId: null,
  gridSize: 20,
  snapToGrid: true,
  zoom: 1,
};

export const useEditorState = () => {
  const [state, setState] = useState<EditorState>(initialState);

  const addLayer = useCallback((type: 'image' | 'shape', data: any) => {
    const newLayer: Layer = {
      id: uuidv4(),
      type,
      visible: true,
      locked: false,
      data,
      position: { x: 0, y: 0, width: 200, height: 200 },
    };

    setState(prev => ({
      ...prev,
      layers: [...prev.layers, newLayer],
      activeLayerId: newLayer.id,
    }));
  }, []);

  const updateLayerPosition = useCallback((id: string, position: Partial<Position>) => {
    setState(prev => ({
      ...prev,
      layers: prev.layers.map(layer =>
        layer.id === id
          ? {
              ...layer,
              position: {
                ...layer.position,
                ...position,
                x: state.snapToGrid
                  ? Math.round(position.x! / state.gridSize) * state.gridSize
                  : position.x!,
                y: state.snapToGrid
                  ? Math.round(position.y! / state.gridSize) * state.gridSize
                  : position.y!,
              },
            }
          : layer
      ),
    }));
  }, [state.gridSize, state.snapToGrid]);

  const moveLayer = useCallback((fromIndex: number, toIndex: number) => {
    setState(prev => {
      const newLayers = [...prev.layers];
      const [movedLayer] = newLayers.splice(fromIndex, 1);
      newLayers.splice(toIndex, 0, movedLayer);
      return { ...prev, layers: newLayers };
    });
  }, []);

  const toggleGridSnap = useCallback(() => {
    setState(prev => ({
      ...prev,
      snapToGrid: !prev.snapToGrid,
    }));
  }, []);

  const setActiveLayer = useCallback((id: string | null) => {
    setState(prev => ({
      ...prev,
      activeLayerId: id,
    }));
  }, []);

  const toggleLayerVisibility = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      layers: prev.layers.map(layer =>
        layer.id === id ? { ...layer, visible: !layer.visible } : layer
      ),
    }));
  }, []);

  const toggleLayerLock = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      layers: prev.layers.map(layer =>
        layer.id === id ? { ...layer, locked: !layer.locked } : layer
      ),
    }));
  }, []);

  const deleteLayer = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      layers: prev.layers.filter(layer => layer.id !== id),
      activeLayerId: prev.activeLayerId === id ? null : prev.activeLayerId,
    }));
  }, []);

  return {
    state,
    addLayer,
    updateLayerPosition,
    moveLayer,
    toggleGridSnap,
    setActiveLayer,
    toggleLayerVisibility,
    toggleLayerLock,
    deleteLayer,
  };
};