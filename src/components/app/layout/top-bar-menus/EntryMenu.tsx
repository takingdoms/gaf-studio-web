import { Menu, MenuItem, MenuItemSeparator } from "@/components/ui/dropdown/DropdownMenu";
import { AdHocWizardsContext } from "@/lib/react/ad-hoc-wizards-context";
import { S } from "@/lib/state/workspace/workspace-context/any-workspace-helper";
import React from "react";

export default function EntryMenu() {
  const activeEntryIndex = S.useActiveEntryIndex();

  const adHocWizards = React.useContext(AdHocWizardsContext);

  return (
    <Menu label="Sequence">
      <MenuItem
        label="Create sequence"
        onClick={() => adHocWizards.createEntry()}
      />

      <MenuItemSeparator />

      <MenuItem
        label="Rename sequence"
        disabled={activeEntryIndex === null}
        onClick={() => adHocWizards.renameActiveEntry()}
      />

      <MenuItem
        label="Delete sequence"
        disabled={activeEntryIndex === null}
        onClick={() => adHocWizards.deleteActiveEntry()}
      />
    </Menu>
  );
}
