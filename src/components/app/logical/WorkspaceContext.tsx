import { Workspace } from "@/lib/state/gaf-studio/workspace";
import React from "react";

export const WorkspaceContext = React.createContext<Workspace | null>(null);
