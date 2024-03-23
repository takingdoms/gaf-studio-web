import { FRAME_SELECTOR_ITEM_HEIGHT, FRAME_SELECTOR_ITEM_WIDTH } from '@/lib/constants';
import { AdHocWizardsContext } from '@/lib/react/ad-hoc-wizards-context';
import { Icons } from '@/lib/react/icons';
import React from 'react';

export default function FrameSelectorAdder({ type }: { type: 'frames' | 'subframes' }) {
  const adHocWizards = React.useContext(AdHocWizardsContext);

  return (
    <div
      className="group shrink-0 border-2 border-gray-300 hover:border-blue-500
        cursor-pointer transition-colors"
      style={{
        width: FRAME_SELECTOR_ITEM_WIDTH,
        height: FRAME_SELECTOR_ITEM_HEIGHT,
      }}
      onClick={() => adHocWizards.importImages(type)}
    >
      <div className="w-full h-full flex justify-center items-center overflow-hidden">
        <Icons.Plus
          className="text-gray-400 group-hover:text-blue-500 transition-colors"
          size={24}
        />
      </div>
    </div>
  );
}
