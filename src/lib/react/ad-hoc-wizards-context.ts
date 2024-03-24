import React from "react";

export type AdHocWizards = {
  importImages: (type: 'frames' | 'subframes') => void;
  convertToMulti: () => void;
  convertToSingle: () => void;
  deleteFrame: () => void;
  deleteSubframe: () => void;
};

const doNothing = () => {};

export const AdHocWizardsContext = React.createContext<AdHocWizards>({
  importImages: doNothing,
  convertToMulti: doNothing,
  convertToSingle: doNothing,
  deleteFrame: doNothing,
  deleteSubframe: doNothing,
});
