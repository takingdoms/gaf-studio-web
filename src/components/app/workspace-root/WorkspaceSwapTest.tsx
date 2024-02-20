import { WorkspaceControllerContext } from "@/components/app/logical/WorkspaceControllerContext";
import TextButton from "@/components/ui/button/TextButton";
import React from 'react';

export default function WorkspaceSwapTest() {
  const workspaceController = React.useContext(WorkspaceControllerContext);

  if (workspaceController === null) {
    return;
  }

  return (
    <div className="p-4">
      <TextButton
        label="Click me :)"
        onClick={() => {
          workspaceController.testSwapFormat();
        }}
      />
    </div>
  );
}
