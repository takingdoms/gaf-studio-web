import { WorkspaceContext } from "@/components/app/logical/WorkspaceContext";
import React from "react";

export default function AppSubBarStatus() {
  const workspace = React.useContext(WorkspaceContext);

  if (workspace === null) {
    return;
  }

  const currentGaf = workspace.getCurrentGaf();

  if (currentGaf === null) {
    return;
  }

  const sourceFile = currentGaf.kind === 'from-file'
    ? currentGaf.fileName
    : undefined;

  return (
    <div className="flex items-center px-1 py-0.5">
      <div className="text-xs">
        <span className="text-slate-500 font-medium">Loaded from file:{' '}</span>
        {sourceFile === undefined ? (
          <span className="text-slate-400 italic">(None)</span>
        ) : (
          <span className="text-slate-500">{sourceFile}</span>
        )}
      </div>
    </div>
  );
}
