import React from "react";

export type AdHocWizards = {
  importImages: (type: 'frames' | 'subframes') => void;
};

export const AdHocWizardsContext = React.createContext<AdHocWizards>({
  importImages: () => {},
});
