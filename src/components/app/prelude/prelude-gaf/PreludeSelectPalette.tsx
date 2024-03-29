import Select, { SelectOption } from '@/components/ui/select/Select';
import { PaletteStorePreSelectable } from '@/lib/state/gaf-studio/palette-store';

type PreludeSelectPaletteProps = {
  preSelectables: readonly PaletteStorePreSelectable[];
  currentValue: string;
  setCurrentValue: (key: string) => void;
  isValid: boolean;
  isLoading: boolean;
};

export default function PreludeSelectPalette({
  preSelectables,
  currentValue,
  setCurrentValue,
  isValid,
  isLoading,
}: PreludeSelectPaletteProps) {
  return (
    <Select
      options={preSelectables.map((preSelectable) => ({
        id: preSelectable.key,
        label: preSelectable.label,
      }))}
      value={currentValue}
      onChange={setCurrentValue}
      disabled={!isValid || isLoading}
    />
  );
}
