import React from "react";

export type AdHocWizards = {
  importImages: (type: 'frames' | 'subframes') => void;
  convertToMulti: () => void;
  convertToSingle: () => void;
};

const doNothing = () => {};

export const AdHocWizardsContext = React.createContext<AdHocWizards>({
  importImages: doNothing,
  convertToMulti: doNothing,
  convertToSingle: doNothing,
});
