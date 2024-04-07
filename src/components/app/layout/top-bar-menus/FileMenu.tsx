import { Menu, MenuItem, MenuItemSeparator } from "@/components/ui/dropdown/DropdownMenu";
import { AdHocWizardsContext } from "@/lib/react/ad-hoc-wizards-context";
import { S } from "@/lib/state/workspace/workspace-context/any-workspace-helper";
import React from "react";

export default function FileMenu() {
  const format = S.useFormat();
  const extName = format === 'gaf' ? 'GAF' : 'TAF';

  const {
    createNewProject,
    // openAnyFile,
  } = React.useContext(AdHocWizardsContext);

  return (
    <Menu label="File">
      <MenuItem
        label="New project..."
        onClick={createNewProject}
      />

      {/* <MenuItemSeparator />

      <MenuItem
        label="Open file..."
        onClick={openAnyFile}
      /> */}

      <MenuItemSeparator />

      <MenuItem
        label={`Export ${extName}...`}
        onClick={() => {}}
      />
    </Menu>
  );
}
