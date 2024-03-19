import { FRAME_SELECTOR_ITEM_HEIGHT } from '@/lib/constants';
import React from 'react';

type SelectorWrapperProps = {
  children: React.ReactNode;
};

export default function SelectorWrapper({ children }: SelectorWrapperProps) {
  return (
    <div
      className="grow flex overflow-x-scroll space-x-1.5 pb-1"
      style={{ minHeight: FRAME_SELECTOR_ITEM_HEIGHT }}
    >
      {children}
    </div>
  );
}
