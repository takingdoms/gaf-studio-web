import React from 'react';

type AbsoluteImageRendererContainerProps = {
  children: React.ReactNode;
  width: number;
  height: number;
  contain: boolean;
};

export default function AbsoluteImageRendererContainer({
  width,
  height,
  children,
  contain,
}: AbsoluteImageRendererContainerProps) {
  const style: React.CSSProperties = contain ? {
    maxWidth: '100%',
    maxHeight: '100%',
    width,
    height,
  } : {
    width,
    height,
  };

  return (
    <div
      className="relative"
      style={style}
    >
      {children}
    </div>
  );
}
