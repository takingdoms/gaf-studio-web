import { Menu, MenuItem } from "@/components/ui/dropdown/DropdownMenu";
import { AdHocWizardsContext } from "@/lib/react/ad-hoc-wizards-context";
import { S } from "@/lib/state/workspace/workspace-context/any-workspace-helper";
import React from "react";

export default function ToolsMenu() {
  const activeEntryIndex = S.useActiveEntryIndex();
  const { changeFrameDuration } = React.useContext(AdHocWizardsContext);

  return (
    <Menu label="Tools">
      <Menu label="Helper hunctions">
        <MenuItem
          label="Change frame duration for Sequence"
          disabled={activeEntryIndex === null}
          onClick={() => changeFrameDuration(true)}
        />
      </Menu>
    </Menu>
  );
}
