'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

const PatternContainer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
  color: ${({ theme }) =>
    theme.mode === 'dark'
      ? 'rgba(139, 92, 255, 0.3)'
      : 'rgba(91, 92, 255, 0.25)'};
`;

const WatermarkItem = styled.div<{ $x: number; $y: number; $size: number; $rotation: number }>`
  position: absolute;
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  transform: translate(-50%, -50%) rotate(${({ $rotation }) => $rotation}deg);
  opacity: 0.4;
`;

const SvgImage = styled(Image)<{ $opacity: number }>`
  width: 100%;
  height: 100%;
  opacity: ${({ $opacity }) => $opacity};
`

type WatermarkPatternProps = {
  count?: number;
  minSize?: number;
  maxSize?: number;
};

type BoundingBox = {
  width: number
  heigth: number
}

export const WatermarkPattern = ({ count = 6, minSize = 40, maxSize = 60 }: WatermarkPatternProps) => {

  const ref = useRef<HTMLDivElement | null>(null)

  const [boundingBox, setBoundingBox] = useState<BoundingBox>({
    width: 375,
    heigth: 100
  })

  useEffect(() => {
    if(ref.current) {
      console.log(ref.current.getBoundingClientRect());
      setBoundingBox({
        width: Math.round(ref.current.getBoundingClientRect().width),
        heigth: Math.round(ref.current.getBoundingClientRect().height)
      })
    }
  }, [ref])

  const watermarks = useMemo(() => {
    const stepX = boundingBox.width / count
    const stepY = boundingBox.heigth / count
    console.log(stepX, stepY);
    
    return Array.from({ length: count }, (_, index) => {
      return {
        x: stepX * index,
        y: Math.random() * boundingBox.heigth,
        size: minSize + Math.random() * (maxSize - minSize),
        rotation: Math.random() * 360,
        variant: Math.round(Math.random())
      }
    })
  }, [count, minSize, maxSize, boundingBox])

  return (
    <PatternContainer ref={ref}>
      {watermarks.map((mark, index) => (
        <WatermarkItem
          key={index}
          $x={mark.x}
          $y={mark.y}
          $size={mark.size}
          $rotation={mark.rotation}
        >
          <SvgImage
            src={mark.variant ? '/assets/berry_2.svg' : '/assets/berry_1.svg'}
            alt="KLUKVA"
            width={mark.size}
            height={mark.size}
            $opacity={(1 / (maxSize - minSize)) * (maxSize - mark.size) - 0.1}
          />
        </WatermarkItem>
      ))}
    </PatternContainer>
  )
};

