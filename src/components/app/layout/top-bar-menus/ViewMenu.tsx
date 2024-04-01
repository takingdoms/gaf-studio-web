import { Menu, MenuItemRadiobox } from "@/components/ui/dropdown/DropdownMenu";
import { useGlobalConfigStore } from "@/lib/state/global-config/global-config-store";

export default function ViewMenu() {
  const frameListMode = useGlobalConfigStore((state) => state.frameListMode);
  const setFrameListMode = useGlobalConfigStore((state) => state.actions.setFrameListMode);
  const subframeListMode = useGlobalConfigStore((state) => state.subframeListMode);
  const setSubframeListMode = useGlobalConfigStore((state) => state.actions.setSubframeListMode);

  return (
    <Menu label="View">
      <Menu label="Frame selector">
        <MenuItemRadiobox
          label="Thumbnails"
          checked={frameListMode === 'thumbs'}
          onChange={() => setFrameListMode('thumbs')}
        />
        <MenuItemRadiobox
          label="Minimalist"
          checked={frameListMode === 'minimal'}
          onChange={() => setFrameListMode('minimal')}
        />
        <MenuItemRadiobox
          label="Hidden"
          checked={frameListMode === 'collapsed'}
          onChange={() => setFrameListMode('collapsed')}
        />
      </Menu>

      <Menu label="Subframe selector">
        <MenuItemRadiobox
          label="Thumbnails"
          checked={subframeListMode === 'thumbs'}
          onChange={() => setSubframeListMode('thumbs')}
        />
        <MenuItemRadiobox
          label="Minimalist"
          checked={subframeListMode === 'minimal'}
          onChange={() => setSubframeListMode('minimal')}
        />
        <MenuItemRadiobox
          label="Hidden"
          checked={subframeListMode === 'collapsed'}
          onChange={() => setSubframeListMode('collapsed')}
        />
      </Menu>
    </Menu>
  );
}
