import { useState, useEffect } from 'react';

type PriceRangeSliderProps = {
  min: number;
  max: number;
  selectedMin: number;
  selectedMax: number;
  onChange: (min: number, max: number) => void;
};

const PriceRangeSlider = ({ min, max, selectedMin, selectedMax, onChange }: PriceRangeSliderProps) => {
  const [localMin, setLocalMin] = useState(selectedMin);
  const [localMax, setLocalMax] = useState(selectedMax);
console.log( min, max, selectedMin, selectedMax, onChange)
  useEffect(() => {
    setLocalMin(selectedMin);
    setLocalMax(selectedMax);
  }, [selectedMin, selectedMax]);

  interface RangeChangeEvent {
    target: {
      value: string;
    };
  }

  const handleMinChange = (e: RangeChangeEvent) => {
    const value = Math.min(Number(e.target.value), localMax - 1);
    setLocalMin(value);
  };

  const handleMaxChange = (e:RangeChangeEvent) => {
    const value = Math.max(Number(e.target.value), localMin + 1);
    setLocalMax(value);
  };

  const handleMouseUp = () => {
    onChange(localMin, localMax);
  };

  const minPos = ((localMin - min) / (max - min)) * 100;
  const maxPos = ((localMax - min) / (max - min)) * 100;

  return (
    <div className="relative h-10">
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 rounded-full transform -translate-y-1/2"></div>
      <div
        className="absolute top-1/2 h-1 bg-blue-500 rounded-full transform -translate-y-1/2"
        style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
      ></div>
      
      <input
  type="range"
  min={min}
  max={max}
  value={localMin}
  onChange={handleMinChange}
  onMouseUp={handleMouseUp}
  onTouchEnd={handleMouseUp}
  className="absolute top-1/2 left-0 w-full h-2 appearance-none opacity-0 transform -translate-y-1/2 z-10"
/>

<input
  type="range"
  min={min}
  max={max}
  value={localMax}
  onChange={handleMaxChange}
  onMouseUp={handleMouseUp}
  onTouchEnd={handleMouseUp}
  className="absolute top-1/2 left-0 w-full h-2 appearance-none opacity-0 transform -translate-y-1/2 z-10"
/>

      <div
        className="absolute top-0 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        style={{ left: `${minPos}%` }}
      ></div>
      
      <div
        className="absolute top-0 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        style={{ left: `${maxPos}%` }}
      ></div>
    </div>
  );
};

export default PriceRangeSlider;