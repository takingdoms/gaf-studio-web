import TextButton from "@/components/ui/button/TextButton";
import { useGlobalConfigStore } from "@/lib/state/global-config/global-config-store";

type ListModeControlsProps = {
  type: 'frames' | 'subframes';
};

export default function ListModeControls({ type }: ListModeControlsProps) {
  const isCollapsed = useGlobalConfigStore((state) => (
    (type === 'frames' ? state.frameListMode : state.subframeListMode) === 'collapsed'
  ));

  const setListMode = useGlobalConfigStore((state) => (
    type === 'frames' ? state.actions.setFrameListMode : state.actions.setSubframeListMode
  ));

  if (!isCollapsed) {
    return;
  }

  return (
    <TextButton
      label="Hidden (Show)"
      onClick={() => setListMode('thumbs')}
    />
  );
}
