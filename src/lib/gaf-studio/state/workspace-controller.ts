import { MainFormat } from "@/lib/gaf-studio/main-format";
import { Workspace } from "@/lib/gaf-studio/state/workspace";
import { DeepReadonly } from "ts-essentials";

export class WorkspaceController {
  constructor(
    public readonly state: DeepReadonly<Workspace>,
    public readonly mutate: (newWorkspace: Workspace) => void,
  ) {}

  createNew(format: MainFormat) {
    const newWorkspace = Workspace.initBlank(format);
    this.mutate(newWorkspace);
  }
}
