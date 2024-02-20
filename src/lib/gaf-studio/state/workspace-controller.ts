import { MainFormat } from "@/lib/gaf-studio/main-format";
import { Workspace } from "@/lib/gaf-studio/state/workspace";
import { DeepReadonly } from "ts-essentials";

export class WorkspaceController {
  constructor(
    private readonly workspace: DeepReadonly<Workspace>,
    private readonly mutate: (newWorkspace: Workspace) => void,
  ) {}

  createNew(format: MainFormat) {
    const newWorkspace = Workspace.initBlank(format);
    this.mutate(newWorkspace);
  }

  testSwapFormat() {
    const newFormat = this.workspace.format === 'gaf' ? 'taf' : 'gaf';
    this.createNew(newFormat);
  }
}
