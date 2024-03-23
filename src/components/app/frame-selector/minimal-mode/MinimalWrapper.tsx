import { MINIMAL_SELECTOR_ITEM_HEIGHT } from '@/lib/constants';
import React from 'react';

type MinimalWrapperProps = {
  children: React.ReactNode;
};

// TODO reuse from SelectorWrapper
export default function MinimalWrapper({ children }: MinimalWrapperProps) {
  return (
    <div
      className="grow flex space-x-1.5"
      style={{ minHeight: MINIMAL_SELECTOR_ITEM_HEIGHT + 10 }} // 10 = add some space for the scrollbar on firefox
    >
      {children}
    </div>
  );
}
