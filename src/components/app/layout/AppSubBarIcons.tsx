import { Icons } from "@/lib/react/icons";
import AppSubBarIconButton from "./AppSubBarIconButton";
import React from "react";
import { AppDebugContext } from "@/components/AppDebugContext";

export default function AppSubBarIcons() {
  const appDebug = React.useContext(AppDebugContext);

  return (
    <div className="flex items-center p-0.5">
      <AppSubBarIconButton
        icon={Icons.NewFile}
        onClick={appDebug.resetWorkspace}
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
