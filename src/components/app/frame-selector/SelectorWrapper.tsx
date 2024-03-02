import { FRAME_SELECTOR_ITEM_HEIGHT } from "@/lib/constants";

type SelectorWrapperProps = {
  label: string;
  children: React.ReactNode;
};

export default function SelectorWrapper({ label, children }: SelectorWrapperProps) {
  return (
    <div className="w-full flex flex-col">
      <div className="font-bold text-sm text-gray-700 mb-0.5">
        {label}:
      </div>

      <div
        className="grow flex overflow-x-scroll space-x-1.5 pb-1"
        style={{ minHeight: FRAME_SELECTOR_ITEM_HEIGHT }}
      >
        {children}
      </div>
    </div>
  );
}
