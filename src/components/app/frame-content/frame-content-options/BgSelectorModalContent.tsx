import SolidButton from "@/components/ui/button/SolidButton";
import ModalPadding from "@/components/ui/modal/ModalPadding";
import { CANVAS_BG_OPTIONS } from "@/lib/state/canvas/canvas-bg-options";
import { useCanvasConfigStore } from "@/lib/state/canvas/canvas-config-store";

type BgSelectorModalContentProps = {
  close: () => void;
};

export default function BgSelectorModalContent({ close }: BgSelectorModalContentProps) {
  const background = useCanvasConfigStore((state) => state.background);
  const setBackground = useCanvasConfigStore((state) => state.actions.setBackground);

  return (
    <ModalPadding>
      <div className="flex flex-wrap -m-2.5 mb-4">
        {CANVAS_BG_OPTIONS.map((option, index) => {
          const isSelected = background === option;
          const cls = isSelected
            ? 'outline outline-4 outline-blue-500'
            : 'hover:outline outline-4 outline-blue-400 cursor-pointer';

          return (
            <div
              key={index}
              className={`${cls} flex justify-center items-center rounded-lg p-1 m-2`}
              onClick={() => {
                if (!isSelected) {
                  setBackground(option);
                }
              }}
            >
              <div
                className="border border-slate-300 rounded-lg"
                style={{
                  width: 100,
                  height: 100,
                  background: option,
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-center">
        <SolidButton onClick={close}>
          OK
        </SolidButton>
      </div>
    </ModalPadding>
  );
}
