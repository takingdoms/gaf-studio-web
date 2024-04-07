import { AdHocWizardsContext } from "@/lib/react/ad-hoc-wizards-context";
import { Icons } from "@/lib/react/icons";
import React from "react";
import AppSubBarIconButton from "./AppSubBarIconButton";

export default function AppSubBarIcons() {
  const { createNewProject } = React.useContext(AdHocWizardsContext);

  return (
    <div className="flex items-center p-0.5">
      <AppSubBarIconButton
        icon={Icons.NewFile}
        onClick={createNewProject}
      />
      <AppSubBarIconButton
        icon={Icons.OpenFile}
        onClick={() => {}}
      />
      <AppSubBarIconButton
        icon={Icons.SaveFile}
        onClick={() => {}}
        disabled
      />
    </div>
  );
}
