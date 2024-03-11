import React from 'react';

type AbsoluteImageRendererWrapperProps = {
  children: React.ReactNode;
  xOffset: number;
  yOffset: number;
};

export default function AbsoluteImageRendererWrapper({
  children,
  xOffset,
  yOffset,
}: AbsoluteImageRendererWrapperProps) {
  return (
    <div
      className="absolute inset-0 flex justify-center items-center overflow-hidden"
      style={{
        left: -xOffset,
        top: -yOffset,
      }}
    >
      {children}
    </div>
  );
}
