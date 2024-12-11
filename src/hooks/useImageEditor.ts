import { useCallback } from 'react';

export const useImageEditor = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const drawImage = useCallback((
    imageUrl: string,
    filter: string,
    brightness: number,
    contrast: number,
    saturation: number
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      // Calculate aspect ratio
      const aspectRatio = img.width / img.height;
      let newWidth = canvas.width;
      let newHeight = canvas.width / aspectRatio;

      if (newHeight > canvas.height) {
        newHeight = canvas.height;
        newWidth = canvas.height * aspectRatio;
      }

      // Center the image
      const x = (canvas.width - newWidth) / 2;
      const y = (canvas.height - newHeight) / 2;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw image
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
      
      if (filter === 'grayscale') {
        ctx.filter += ' grayscale(100%)';
      } else if (filter === 'sepia') {
        ctx.filter += ' sepia(100%)';
      } else if (filter === 'invert') {
        ctx.filter += ' invert(100%)';
      }

      ctx.drawImage(img, x, y, newWidth, newHeight);
    };

    img.src = imageUrl;
  }, []);

  return { drawImage };
};