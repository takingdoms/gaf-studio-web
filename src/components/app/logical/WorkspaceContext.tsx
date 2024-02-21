import { Workspace } from "@/lib/gaf-studio/state/workspace";
import React from "react";

export const WorkspaceContext = React.createContext<Workspace | null>(null);
