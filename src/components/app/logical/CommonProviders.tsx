import { PaletteStoreContext } from '@/components/app/logical/PaletteStoreContext';
import ModalContextProvider from '@/components/ui/modal/ModalContextProvider';
import { PaletteStore } from '@/lib/state/gaf-studio/palette-store';

type CommonProvidersProps = {
  children: React.ReactNode;
  paletteStore: PaletteStore | null;
};

export default function CommonProviders({ children, paletteStore }: CommonProvidersProps) {
  return (
    <ModalContextProvider>
      <PaletteStoreContext.Provider value={paletteStore}>
        {children}
      </PaletteStoreContext.Provider>
    </ModalContextProvider>
  );
}
