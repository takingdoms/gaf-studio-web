import { PaletteStore } from "@/lib/state/gaf-studio/palette-store";
import React from "react";

export const PaletteStoreContext = React.createContext<PaletteStore | null>(null);
