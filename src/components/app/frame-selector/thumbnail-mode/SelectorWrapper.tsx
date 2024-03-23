import { FRAME_SELECTOR_ITEM_HEIGHT } from '@/lib/constants';
import React from 'react';

type SelectorWrapperProps = {
  children: React.ReactNode;
};

export default function SelectorWrapper({ children }: SelectorWrapperProps) {
  return (
    <div
      className="grow flex space-x-1.5"
      style={{ minHeight: FRAME_SELECTOR_ITEM_HEIGHT + 10 }} // 10 = add some space for the scrollbar on firefox
    >
      {children}
    </div>
  );
}
