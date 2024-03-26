import React from 'react';

type SelectorItemsWrapperProps = {
  children: React.ReactNode;
  minHeight: number;
};

export default function SelectorItemsWrapper({ children, minHeight }: SelectorItemsWrapperProps) {
  return (
    <div
      className="grow flex space-x-1.5"
      style={{ minHeight: minHeight + 10 }} // 10 = add some space for the scrollbar on firefox
    >
      {children}
    </div>
  );
}
