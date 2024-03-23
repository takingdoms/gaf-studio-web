import React from 'react';

type SelectorWrapperScrollerProps = {
  children: React.ReactNode;
};

export default function SelectorWrapperScroller({ children }: SelectorWrapperScrollerProps) {
  return (
    <div className="flex space-x-1.5 overflow-x-auto">
      {children}
    </div>
  );
}
