import { Icons } from "@/lib/react/icons";
import AppIconbarButton from "./AppIconbarButton";
import React from "react";
import { AppDebugContext } from "@/components/AppDebugContext";

export default function AppIconbar() {
  const appDebug = React.useContext(AppDebugContext);

  return (
    <div
      className="flex items-stretch w-full overflow-x-auto overflow-y-hidden bg-slate-200 p-0.5"
    >
      <AppIconbarButton
        icon={Icons.NewFile}
        onClick={appDebug.resetWorkspace}
      />
      <AppIconbarButton
        icon={Icons.OpenFile}
        onClick={() => {}}
      />
      <AppIconbarButton
        icon={Icons.SaveFile}
        onClick={() => {}}
        disabled
      />
    </div>
  );
}
