import { MainFormat, TafSubFormat } from "@/lib/gaf-studio/main-format";
import { CurrentGaf } from "@/lib/gaf-studio/state/current-gaf";
import { Workspace } from "@/lib/gaf-studio/state/workspace";
import { DeepReadonly } from "ts-essentials";

export class WorkspaceController {
  constructor(
    public readonly state: DeepReadonly<Workspace>,
    private readonly mutate: (newWorkspace: DeepReadonly<Workspace>) => void,
  ) {}

  createNew(format: MainFormat) {
    const newWorkspace = Workspace.initBlank(format);
    this.mutate(newWorkspace);
  }

  // TODO move to WorkspaceTafController
  /*getActiveSubFormatGaf(): DeepReadonly<CurrentGaf> | null {
    if (this.state.format === 'gaf') {
      throw new Error(`GAF files don't have sub-formats.`);
    }

    if (this.state.activeSubFormat === null) {
      return null;
    }

    return this.state.currentGafs[this.state.activeSubFormat];
  }*/

  // TODO move to WorkspaceTafController
  setActiveSubFormat(subFormat: TafSubFormat) {
    if (this.state.format === 'gaf') {
      throw new Error(`GAF files don't have sub-formats.`);
    }

    if (subFormat === this.state.activeSubFormat) {
      return; // nothing to do
    }

    this.mutate({
      ...this.state,
      activeSubFormat: subFormat,
    });
  }

  // TODO move to WorkspaceTafController
  createSubFormat(subFormat: TafSubFormat, setAsActive = false) {
    if (this.state.format === 'gaf') {
      throw new Error(`GAF files don't have sub-formats.`);
    }

    if (this.state.currentGafs[subFormat] !== null) {
      throw new Error(`Sub-format "${subFormat}" already exists.`);
    }

    const newGaf: CurrentGaf = {
      kind: 'blank',
      entries: [],
    };

    this.mutate({
      ...this.state,
      currentGafs: {
        ...this.state.currentGafs,
        [subFormat]: newGaf,
      },
      activeSubFormat: setAsActive ? subFormat : this.state.activeSubFormat,
    });
  }
}
