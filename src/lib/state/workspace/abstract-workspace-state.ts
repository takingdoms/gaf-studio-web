import { CurrentGaf } from "@/lib/state/gaf-studio/current-gaf";

/**
 * State that must be implemented by both GafWorkspaceState and TafWorkspaceState.
 * The difference between this and CommonWorkspaceState is that the stuff at Common has the same
 * implementation between the Gaf and Taf states and therefore can be shared in the
 * _makeCommonWorkspace helper function.
*/
export type AbstractWorkspaceState = {
  readonly abstractActions: {
    readonly getCurrentGaf: () => CurrentGaf;
    readonly setCurrentGaf: (newCurrentGaf: CurrentGaf) => void;
  };
};
