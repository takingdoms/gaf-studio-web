import ListModeControls from "@/components/app/frame-selector/ListModeControls";
import React from "react";

type ListWrapperProps = {
  type: 'frames' | 'subframes';
  children: React.ReactNode;
};

export default function ListWrapper({ type, children }: ListWrapperProps) {
  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between~ items-center text-sm space-x-1.5 mb-0.5">
        <div className="font-bold text-gray-700">
          {type === 'frames' ? 'Frames' : 'Subframes'}:
        </div>

        <ListModeControls type={type} />
      </div>

      {children}
    </div>
  );
}
