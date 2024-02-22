import React from "react";

export const AppDebugContext = React.createContext<{
  resetWorkspace: () => void;
}>(undefined!);
