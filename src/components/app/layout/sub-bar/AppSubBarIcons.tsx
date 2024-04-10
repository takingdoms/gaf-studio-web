import { AdHocWizardsContext } from "@/lib/react/ad-hoc-wizards-context";
import { Icons } from "@/lib/react/icons";
import React from "react";
import AppSubBarIconButton from "./AppSubBarIconButton";
import AppSubBarSeparator from "@/components/app/layout/sub-bar/AppSubBarSeparator";
import { S } from "@/lib/state/workspace/workspace-context/any-workspace-helper";

export default function AppSubBarIcons() {
  const format = S.useFormat();
  const extName = format === 'gaf' ? 'GAF' : 'TAF';

  const {
    createNewProject,
    exportResult,
  } = React.useContext(AdHocWizardsContext);

  return (
    <div className="flex items-center p-0.5">
      <AppSubBarIconButton
        icon={Icons.NewFile}
        label="New project"
        onClick={createNewProject}
      />
      {/* <AppSubBarIconButton
        icon={Icons.OpenFile}
        onClick={openAnyFile}
      /> */}

      <AppSubBarSeparator />

      <AppSubBarIconButton
        icon={Icons.Exportfile}
        label={`Export ${extName}`}
        onClick={exportResult}
      />
    </div>
  );
}
