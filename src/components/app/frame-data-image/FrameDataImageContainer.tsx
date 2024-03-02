import React from 'react';

type FrameDataImageContainerProps = {
  width: number;
  height: number;
  children: React.ReactNode;
};

export default function FrameDataImageContainer({
  width,
  height,
  children,
}: FrameDataImageContainerProps) {
  return (
    <div
      className="relative"
      style={{
        width,
        height,
      }}
    >
      {children}
    </div>
  );
}
