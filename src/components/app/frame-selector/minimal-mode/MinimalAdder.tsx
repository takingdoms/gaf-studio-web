import { MINIMAL_SELECTOR_ITEM_HEIGHT, MINIMAL_SELECTOR_ITEM_WIDTH } from '@/lib/constants';
import { AdHocWizardsContext } from '@/lib/react/ad-hoc-wizards-context';
import { Icons } from '@/lib/react/icons';
import React from 'react';

export default function MinimalAdder({ type }: { type: 'frames' | 'subframes' }) {
  const adHocWizards = React.useContext(AdHocWizardsContext);

  return (
    <div
      className="group shrink-0 border-2 border-gray-300 hover:border-blue-500 text-xs flex
        flex-col justify-center items-center overflow-hidden cursor-pointer transition-colors"
      style={{
        width: MINIMAL_SELECTOR_ITEM_WIDTH,
        height: MINIMAL_SELECTOR_ITEM_HEIGHT,
      }}
      onClick={() => adHocWizards.importImages(type)}
    >
      <Icons.Plus
        className="text-gray-400 group-hover:text-blue-500 transition-colors"
        size={20}
      />
    </div>
  );
}
