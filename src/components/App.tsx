import PreludeScreen from "@/components/app/prelude/PreludeScreen";
import { Workspace } from "@/lib/gaf-studio/state/workspace";
import React from "react";
import { DeepReadonly } from "ts-essentials";
import AppLayout from "./app/layout/AppLayout";

export default function App() {
  const [workspace, setWorkspace] = React.useState<DeepReadonly<Workspace>>();

  if (workspace === undefined) {
    return (
      <PreludeScreen onInit={setWorkspace} />
    );
  }

  return (
    <AppLayout>
      {/* <GafFileLoader>
        <FileMapViewer />
      </GafFileLoader> */}
      ...
    </AppLayout>
  );
}
