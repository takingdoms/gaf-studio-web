import { Menu, MenuItem, MenuItemSeparator } from "@/components/ui/dropdown/DropdownMenu";
import { AdHocWizardsContext } from "@/lib/react/ad-hoc-wizards-context";
import { S } from "@/lib/state/store/store-helper";
import React from "react";

export default function FrameMenu() {
  const activeEntryIndex = S.useStore()((state) => state.cursor.entryIndex);
  const activeFrameIndex = S.useStore()((state) => state.cursor.frameIndex);
  const kind = S.useActiveFrameDataKind();

  const adHocWizards = React.useContext(AdHocWizardsContext);

  return (
    <Menu label="Frame">
      <MenuItem
        label="Create frame(s)"
        disabled={activeEntryIndex === null}
        onClick={() => adHocWizards.importImages('frames')}
      />

      <MenuItemSeparator />

      <Menu
        label="Convert frame to..."
        disabled={activeFrameIndex === null}
      >
        <MenuItem
          label="Single-layered"
          disabled={kind === null || kind === 'single'}
          onClick={() => adHocWizards.convertToSingle()}
        />

        <MenuItem
          label="Multi-layered"
          disabled={kind === null || kind === 'multi'}
          onClick={() => adHocWizards.convertToMulti()}
        />
      </Menu>

      <MenuItem
        label="Delete frame"
        disabled={activeFrameIndex === null}
        onClick={() => adHocWizards.deleteFrame()}
      />
    </Menu>
  );
}
