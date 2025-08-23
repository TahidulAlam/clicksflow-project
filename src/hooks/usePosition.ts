"use client"
import { useState, useEffect } from 'react';

export const usePosition = (
  triggerRef: React.RefObject<HTMLElement>,
  menuRef: React.RefObject<HTMLElement>,
  position: string,
  isOpen: boolean
) => {
  const [positionStyle, setPositionStyle] = useState<React.CSSProperties>({});
  const [calculatedPosition, setCalculatedPosition] = useState(position);

  useEffect(() => {
    if (!isOpen || !triggerRef.current || !menuRef.current) return;

    const calculatePosition = () => {
      const triggerRect = triggerRef.current!.getBoundingClientRect();
      const menuRect = menuRef.current!.getBoundingClientRect();
      const viewportPadding = 16;
      let newPosition = position;

      // Fallback positions for overflow cases
      if (position.startsWith('bottom')) {
        const spaceBelow = window.innerHeight - triggerRect.bottom;
        const spaceAbove = triggerRect.top;
        if (spaceBelow < menuRect.height && spaceAbove > spaceBelow) {
          newPosition = position.replace('bottom', 'top');
        }
      } else if (position.startsWith('top')) {
        const spaceAbove = triggerRect.top;
        const spaceBelow = window.innerHeight - triggerRect.bottom;
        if (spaceAbove < menuRect.height && spaceBelow > spaceAbove) {
          newPosition = position.replace('top', 'bottom');
        }
      }

      setCalculatedPosition(newPosition);
      const styles = calculatePositionStyle(newPosition, triggerRect, menuRect, viewportPadding);
      setPositionStyle(styles);
    };

    calculatePosition();
    window.addEventListener('resize', calculatePosition);
    return () => window.removeEventListener('resize', calculatePosition);
  }, [isOpen, position, triggerRef, menuRef]);

  return { position: calculatedPosition, positionStyle };
};

const calculatePositionStyle = (
  position: string,
  triggerRect: DOMRect,
  menuRect: DOMRect,
  viewportPadding: number
): React.CSSProperties => {
  const positions: Record<string, React.CSSProperties> = {
    'top-left': {
      left: 0,
      bottom: `${window.innerHeight - triggerRect.top + viewportPadding}px`,
    },
    'top-right': {
      right: 0,
      bottom: `${window.innerHeight - triggerRect.top + viewportPadding}px`,
    },
    'top-center': {
      left: `${triggerRect.left + triggerRect.width / 2 - menuRect.width / 2}px`,
      bottom: `${window.innerHeight - triggerRect.top + viewportPadding}px`,
    },
    'bottom-left': {
      left: 0,
      top: `${triggerRect.bottom + viewportPadding}px`,
    },
    'bottom-right': {
      right: 0,
      top: `${triggerRect.bottom + viewportPadding}px`,
    },
    'bottom-center': {
      left: `${triggerRect.left + triggerRect.width / 2 - menuRect.width / 2}px`,
      top: `${triggerRect.bottom + viewportPadding}px`,
    },
  };

  return positions[position] || {};
};