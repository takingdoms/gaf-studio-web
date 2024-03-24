import { Menu, MenuItem, MenuItemSeparator } from "@/components/ui/dropdown/DropdownMenu";
import { AdHocWizardsContext } from "@/lib/react/ad-hoc-wizards-context";
import { S } from "@/lib/state/store/store-helper";
import React from "react";

export default function SubframeMenu() {
  const activeFrameIndex = S.useStore()((state) => state.cursor.frameIndex);
  const activeSubframeIndex = S.useStore()((state) => state.cursor.subframeIndex);

  const adHocWizards = React.useContext(AdHocWizardsContext);

  return (
    <Menu label="Subframe">

      <MenuItem
        label="Create subframe(s)"
        disabled={activeFrameIndex === null}
        onClick={() => adHocWizards.importImages('subframes')}
      />

      <MenuItemSeparator />

      <MenuItem
        label="Delete subframe"
        disabled={activeSubframeIndex === null}
        onClick={() => adHocWizards.deleteSubframe()}
      />
    </Menu>
  );
}
