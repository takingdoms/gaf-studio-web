import { WorkspaceController } from "@/lib/gaf-studio/state/workspace-controller";
import React from "react";

export const WorkspaceControllerContext = React.createContext<WorkspaceController | null>(null);
