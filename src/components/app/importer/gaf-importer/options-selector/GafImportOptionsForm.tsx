import { GafConfiguredFile, GafImportedFile } from '@/components/app/importer/gaf-importer/gaf-importing-types';
import TextButton from '@/components/ui/button/TextButton';
import { ModalHelpersContext } from '@/components/ui/modal/ModalContext';
import React from 'react';

type GafImportOptionsFormProps = {
  importedFile: GafImportedFile;
  currentConfig: GafConfiguredFile;
  setCurrentConfig: (value: GafConfiguredFile) => void;
  onClickApplyAll?: () => void;
};

export default function GafImportOptionsForm({
  importedFile,
  currentConfig,
  setCurrentConfig,
  onClickApplyAll,
}: GafImportOptionsFormProps) {
  const { numberPrompt } = React.useContext(ModalHelpersContext);

  const onClickOverrideTranspIndex = React.useCallback(async () => {
    const value = await numberPrompt({
      title: 'Override Transparency Index',
      label: 'Enter a Transparency Index value:',
      min: 0,
      max: 255,
      defaultValue: currentConfig.options.transparencyIndex,
    });

    if (value === null || value < 0 || value > 255) {
      return;
    }

    setCurrentConfig({
      ...currentConfig,
      options: {
        ...currentConfig.options,
        transparencyIndex: value,
      },
    });
  }, [currentConfig, setCurrentConfig, numberPrompt]);

  const onClickResetTranspIndex = React.useCallback(() => {
    if (importedFile.importerResult.kind === 'error') {
      alert(`Can't use value from the Importer because the importer errored out.`);
      return;
    }

    setCurrentConfig({
      ...currentConfig,
      options: {
        ...currentConfig.options,
        transparencyIndex: importedFile.importerResult.result.transparencyIndex,
      },
    });
  }, [importedFile, setCurrentConfig, currentConfig]);

  const centerControl = (
    <label className="flex items-center space-x-1.5">
      <input
        type="checkbox"
        checked={currentConfig.options.center}
        onChange={(ev) => {
          const checked = ev.target.checked;
          setCurrentConfig({
            ...currentConfig,
            options: {
              ...currentConfig.options,
              center: checked,
            },
          });
        }}
      />
      <span>Auto center image</span>
    </label>
  );

  const compressControl = (
    <label className="flex items-center space-x-1.5">
      <input
        type="checkbox"
        checked={currentConfig.options.compress}
        onChange={(ev) => {
          const checked = ev.target.checked;
          setCurrentConfig({
            ...currentConfig,
            options: {
              ...currentConfig.options,
              compress: checked,
            },
          });
        }}
      />
      <span>Compress image</span>
    </label>
  );

  const isTranpIndexOverridden = importedFile.importerResult.kind !== 'error' &&
    currentConfig.options.transparencyIndex !== importedFile.importerResult.result.transparencyIndex;

  const transpIndexControl = (
    <div className="flex flex-col">
      <div className="flex items-center space-x-1.5">
        <span>Transparency Index:</span>
        <span
          className={`font-mono ${isTranpIndexOverridden ? 'text-red-600 italic underline' : ''}`}
          title={isTranpIndexOverridden ? TRANSP_INDEX_OVERRIDEN_MSG : undefined}
        >
          {currentConfig.options.transparencyIndex}
        </span>
      </div>
      <div className="flex flex-wrap space-x-2 text-xs">
        <TextButton
          label="Override"
          onClick={onClickOverrideTranspIndex}
          title="Override the value assigned by the Importer with a fixed value"
        />
        {isTranpIndexOverridden && (
          <TextButton
            label="Reset"
            onClick={onClickResetTranspIndex}
            title="Resets the overridden value to the value assigned by the Importer"
            disabled={!isTranpIndexOverridden}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="flex">
      <div className="flex-1 flex flex-col items-start">
        <div className="flex flex-col items-start space-y-2">
          {centerControl}
          {compressControl}

          {onClickApplyAll && (
            <div className="self-center mt-2 text-center text-xs">
              <TextButton
                label="Apply to all images"
                onClick={onClickApplyAll}
              />
            </div>
          )}
        </div>
      </div>

      <div className="mx-4 border-l border-slate-200" />

      <div className="flex-1 flex flex-col items-start space-y-2">
        {transpIndexControl}
      </div>
    </div>
  );
}

const TRANSP_INDEX_OVERRIDEN_MSG = `This value differs from the value that was assigned by the`
  + ` Importer. Only use this if you really know what you're doing. Click [Reset] if you don't.`;
