import { PaletteStore } from "@/lib/gaf-studio/state/palette-store";
import React from "react";

export const PaletteStoreContext = React.createContext<PaletteStore | null>(null);
