import TextButton from "@/components/ui/button/TextButton";
import { LIST_MODE_LABEL, ListMode } from "@/lib/state/global-config/global-config";
import { useGlobalConfigStore } from "@/lib/state/global-config/global-config-store";

type ListModeControlsProps = {
  type: 'frames' | 'subframes';
};

export default function ListModeControls({ type }: ListModeControlsProps) {
  const listMode = useGlobalConfigStore((state) => (
    type === 'frames' ? state.frameListMode : state.subframeListMode
  ));

  const setListMode = useGlobalConfigStore((state) => (
    type === 'frames' ? state.actions.setFrameListMode : state.actions.setSubframeListMode
  ));

  return (
    <div className="flex space-x-1.5 text-xs">
      {Object.entries(LIST_MODE_LABEL).map(([mode, label]) => (
        <TextButton
          key={mode}
          label={label}
          onClick={() => setListMode(mode as ListMode)}
          disabled={mode === listMode}
        />
      ))}
    </div>
  );
}
