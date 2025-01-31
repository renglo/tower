import React, { useState, useEffect } from "react";

interface SliderTwoHandlesProps {
  onValueChange: (value: string) => void; // Callback prop to pass value to parent
}

export default function SliderTwoHandles({onValueChange}:SliderTwoHandlesProps) {


  const [startMonth] = useState<number>(0); // Keep only the value
  const [endMonth, setEndMonth] = useState<number>(0); // End of the range

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    //setEndMonth(1);
    onValueChange(endMonth.toString());
  },[]);


  const handleEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const value = parseInt(event.target.value, 10);
    console.log('handleEndChange Triggered:',value)
    if (value >= startMonth) {
      setEndMonth(value);
      onValueChange(value.toString());
    }
  };


  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-full flex justify-between text-xs">
        {months.map((month, index) => (
          <span key={index} className="text-center w-8">
            {month}
          </span>
        ))}
      </div>
      <div className="relative w-full mt-4">
        {/* Track */}
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-2 bg-gray-300 rounded-md"></div>
        {/* Selected Range */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 h-2 bg-[#97C9C8] rounded-md"
          style={{
            left: `${(startMonth / 11) * 100}%`,
            right: `${(1 - endMonth / 11) * 100}%`,
          }}
        ></div>
        
        {/* End Handle */}
        <input
          type="range"
          min="0"
          max="11"
          value={endMonth}
          onChange={handleEndChange}
          className="absolute w-full h-0 appearance-none bg-transparent pointer-events-auto z-10 bg-[#8BC53F] slider-thumb"
          style={{
            appearance: "none",
          }}
        />
      </div>
      <div className="flex space-x-4">
        <span>Start: {months[startMonth]}</span>
        <span>End: {months[endMonth]}</span>
      </div>
    </div>
  );
};

