export interface Layer {
  id: string;
  type: 'image' | 'shape';
  visible: boolean;
  locked: boolean;
  data: Shape | ImageData;
  position: Position;
}

export interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Shape {
  type: 'rectangle' | 'circle' | 'triangle';
  fill: string;
  stroke: string;
  strokeWidth: number;
}

export interface ImageData {
  url: string;
  filter: string;
  brightness: number;
  contrast: number;
  saturation: number;
}

export interface EditorState {
  layers: Layer[];
  activeLayerId: string | null;
  gridSize: number;
  snapToGrid: boolean;
  zoom: number;
}