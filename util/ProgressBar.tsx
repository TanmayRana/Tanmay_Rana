import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  showValue?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  max = 100, 
  color = "bg-indigo-500", 
  showValue = true 
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        {showValue && (
          <span className="text-sm font-medium text-gray-700">{value}%</span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-700 ease-out ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;