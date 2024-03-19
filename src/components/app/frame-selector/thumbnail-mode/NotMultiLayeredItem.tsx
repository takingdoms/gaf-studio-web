import { FRAME_SELECTOR_ITEM_HEIGHT, FRAME_SELECTOR_ITEM_WIDTH } from '@/lib/constants';

// TODO reuse code from FrameSelectorItem
export default function NotMultiLayered() {
  return (
    <div
      className="w-full flex justify-center items-center"
      style={{ height: FRAME_SELECTOR_ITEM_HEIGHT }}
    >
      <span className="font-bold text-slate-500 text-xs text-center">
        Active frame is not multi-layered
      </span>
    </div>
  );
}
