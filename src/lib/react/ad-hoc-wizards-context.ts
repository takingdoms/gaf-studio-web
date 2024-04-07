import React from "react";

export type AdHocWizards = {
  createNewProject: () => void;
  openAnyFile: () => void;
  importImages: (type: 'frames' | 'subframes') => void;
  convertToMulti: () => void;
  convertToSingle: () => void;
  deleteFrame: () => void;
  deleteSubframe: () => void;
  changeFrameDuration: (applyToAll: boolean) => void;
  createEntry: () => void;
  renameActiveEntry: () => void;
  deleteActiveEntry: () => void;
  replaceActiveFrameData: () => void;
  changeFrameDataUnknown2: (target: 'active-frame' | 'active-subframe') => void;
  changeFrameDataUnknown3: (target: 'active-frame' | 'active-subframe') => void;
};

const doNothing = () => {};

export const AdHocWizardsContext = React.createContext<AdHocWizards>({
  createNewProject: doNothing,
  openAnyFile: doNothing,
  importImages: doNothing,
  convertToMulti: doNothing,
  convertToSingle: doNothing,
  deleteFrame: doNothing,
  deleteSubframe: doNothing,
  changeFrameDuration: doNothing,
  createEntry: doNothing,
  renameActiveEntry: doNothing,
  deleteActiveEntry: doNothing,
  replaceActiveFrameData: doNothing,
  changeFrameDataUnknown2: doNothing,
  changeFrameDataUnknown3: doNothing,
});
