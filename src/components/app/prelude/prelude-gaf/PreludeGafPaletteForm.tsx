import PreludeFileChooser from '@/components/app/prelude/common-ui/PreludeFileChooser';
import { PaletteSelectionMode } from '@/components/app/prelude/prelude-gaf/PreludeGafForm';
import PreludeSelectPalette from '@/components/app/prelude/prelude-gaf/PreludeSelectPalette';
import { PaletteUtils } from '@/lib/image/palette/palette-utils';
import { CurrentPalette } from '@/lib/state/gaf-studio/current-palette';
import { PaletteStore, PaletteStorePreSelectable } from '@/lib/state/gaf-studio/palette-store';
import { Result } from '@/lib/utils/result';
import React from 'react';

type PreludeGafPaletteFormProps = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  paletteStore: PaletteStore;
  palMode: PaletteSelectionMode;
  setPalMode: (palMode: PaletteSelectionMode) => void;
  currentPal: Result<CurrentPalette, string> | undefined;
  setCurrentPal: (pal: Result<CurrentPalette, string> | undefined) => void;
};

const tdCls = 'px-2 py-1 text-slate-500 font-semibold';

export default function PreludeGafPaletteForm({
  isLoading,
  setIsLoading,
  paletteStore,
  palMode,
  setPalMode,
  currentPal,
  setCurrentPal,
}: PreludeGafPaletteFormProps) {
  const [preSelectable, setPreSelectable] = React.useState<PaletteStorePreSelectable>(
    paletteStore.preSelectables[0]
  );

  const [userFile, setUserFile] = React.useState<File>();

  const onSetPreSelectableKey = React.useCallback((key: string) => {
    if (isLoading) {
      return;
    }

    const newPreSelectable = paletteStore.preSelectables.find((next) => {
      return next.key === key;
    })!;

    setPreSelectable(newPreSelectable);
    setIsLoading(true);

    paletteStore.loadPreSelectable(key)
      .then((result) => {
        setCurrentPal({
          kind: 'ok',
          ok: result,
        });
      })
      .catch((err) => {
        console.error(err);
        setCurrentPal({
          kind: 'err',
          err: `Error when trying to load pre-selectable palette: ${newPreSelectable.key}`,
        });
      })
      .finally(() => setIsLoading(false));
  }, [isLoading, setIsLoading, paletteStore, setCurrentPal]);

  const onSetUserFile = React.useCallback((file: File) => {
    setIsLoading(true);

    PaletteUtils.loadFromPcxFile(file)
      .then((palette) => {
        const previewImage = PaletteUtils.compilePreviewImage(palette);

        setUserFile(file);
        setPalMode('user-file');
        setCurrentPal({
          kind: 'ok',
          ok: {
            kind: 'custom-file',
            originFile: file,
            palette,
            previewImage,
          },
        });
      })
      .catch((err) => {
        console.error(err);
        setCurrentPal({
          kind: 'err',
          err: `Error when trying to load palette from file: ${file.name}`,
        });
      })
      .finally(() => setIsLoading(false));

    // setUserFile(file);
  }, [setCurrentPal, setIsLoading, setPalMode]);

  const onRemoveUserFile = React.useCallback(() => {
    setPalMode('pre-selectable');
    setUserFile(undefined);
    setCurrentPal({
      kind: 'ok',
      ok: paletteStore.default,
    });
    setPreSelectable(paletteStore.preSelectables[0]);
  }, [paletteStore, setCurrentPal, setPalMode]);

  return (
    <div className="flex flex-col items-center space-y-2">
      <div>
        <div className="text-center text-xs text-slate-600 font-semibold mb-0.5">
          Built-in palettes
        </div>
        <PreludeSelectPalette
          preSelectables={paletteStore.preSelectables}
          currentValue={preSelectable.key}
          setCurrentValue={onSetPreSelectableKey}
          isValid={palMode === 'pre-selectable'}
          isLoading={isLoading}
        />
      </div>

      <div className="text-center text-slate-500 text-sm">
        or
      </div>

      <div>
        <div className="text-center text-xs text-slate-600 font-semibold mb-0.5">
          Select .pcx file
        </div>
        <PreludeFileChooser
          file={userFile}
          setFile={onSetUserFile}
          disabled={isLoading}
          accept=".pcx"
          onRemove={onRemoveUserFile}
        />
      </div>
    </div>
  );
}
