import { Workspace } from "@/lib/gaf-studio/state/workspace";
import React from "react";
import { DeepReadonly } from "ts-essentials";

export const WorkspaceContext = React.createContext<DeepReadonly<Workspace> | null>(null);
