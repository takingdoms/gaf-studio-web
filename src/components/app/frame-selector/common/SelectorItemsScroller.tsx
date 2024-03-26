import React from 'react';

type SelectorItemsScrollerProps = {
  children: React.ReactNode;
};

export default function SelectorItemsScroller({ children }: SelectorItemsScrollerProps) {
  return (
    <div className="flex space-x-1.5 overflow-x-auto">
      {children}
    </div>
  );
}
