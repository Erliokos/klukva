'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ParticleEngine } from '@/lib/particles';

const CanvasWrapper = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

export const ParticlesCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<ParticleEngine | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    engineRef.current = ParticleEngine.create(canvas, {
      color: 'rgba(91, 92, 255, 0.7)',
      density: 160,
      parallaxStrength: 0.04,
    });
    engineRef.current.init();
    engineRef.current.start();

    const handleMove = (event: PointerEvent) => {
      if (!engineRef.current) return;
      const rect = canvas.getBoundingClientRect();
      engineRef.current.updatePointer(event.clientX - rect.left, event.clientY - rect.top);
    };

    window.addEventListener('pointermove', handleMove);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      engineRef.current?.destroy();
    };
  }, []);

  return <CanvasWrapper ref={canvasRef} />;
};
