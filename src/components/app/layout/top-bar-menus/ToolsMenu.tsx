import ExportCurrentImageMenuItem from "@/components/app/layout/top-bar-menus/tools-menu/ExportCurrentImageMenuItem";
import { Menu, MenuItem } from "@/components/ui/dropdown/DropdownMenu";
import { AdHocWizardsContext } from "@/lib/react/ad-hoc-wizards-context";
import { S } from "@/lib/state/workspace/workspace-context/any-workspace-helper";
import React from "react";

export default function ToolsMenu() {
  const activeEntryIndex = S.useActiveEntryIndex();
  const activeFrameIndex = S.useActiveFrameIndex();
  const activeFrameFrameDataIsMulti = S.useActiveFrameFrameDataIsMulti();

  const { changeFrameDuration } = React.useContext(AdHocWizardsContext);

  return (
    <Menu label="Tools">
      <Menu label="Helper functions">
        <MenuItem
          label="Change frame duration for sequence"
          disabled={activeEntryIndex === null}
          onClick={() => changeFrameDuration(true)}
        />
      </Menu>
      <Menu label="Export image(s)">
        <ExportCurrentImageMenuItem />
        <MenuItem
          label="Current frame list"
          disabled={activeEntryIndex === null}
          onClick={() => {}}
        />
        <MenuItem
          label="Current subframe list"
          disabled={activeFrameIndex === null || !activeFrameFrameDataIsMulti}
          onClick={() => {}}
        />
        <MenuItem
          label="Everything"
          disabled={activeFrameIndex === null}
          onClick={() => {}}
        />
      </Menu>
    </Menu>
  );
}
