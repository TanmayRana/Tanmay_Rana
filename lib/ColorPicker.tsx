"use client";
import React from "react";

interface Props {
  selectedColor: string;
  onSelect: (color: string) => void;
  colors: string[];
}

const ColorPicker = ({ selectedColor, onSelect, colors }: Props) => {
  return (
    <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg">
      {colors.map((colorClass) => (
        <button
          key={colorClass}
          type="button"
          onClick={() => onSelect(colorClass)}
          className={`w-8 h-8 rounded-full border-2 ${colorClass} ${
            selectedColor === colorClass
              ? "border-indigo-500 ring-2 ring-indigo-500"
              : "border-transparent"
          }`}
          aria-label={`Select color ${colorClass.replace("bg-", "")}`}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
