import React from 'react';

type CollapsibleWrapperProps = {
  children: React.ReactNode;
  grow?: boolean;
  maxHeight?: number | string;
};

export default function CollapsibleWrapper({
  children,
  grow,
  maxHeight,
}: CollapsibleWrapperProps) {
  return (
    <div
      className={`${grow ? 'grow' : ''} flex flex-col overflow-hidden bg-white`}
      style={{ maxHeight }}
    >
      {children}
    </div>
  );
}
