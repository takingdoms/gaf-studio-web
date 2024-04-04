import { TafImporting } from '@/components/app/importer/taf-importer/taf-importing-types';
import TextButton from '@/components/ui/button/TextButton';

type TafImportOptionsFormProps = {
  currentResult: TafImporting.ResultItem;
  setCurrentResult: (value: TafImporting.ResultItem) => void;
  onClickApplyAll?: () => void;
};

export default function TafImportOptionsForm({
  currentResult,
  setCurrentResult,
  onClickApplyAll,
}: TafImportOptionsFormProps) {
  const centerControl = (
    <label className="flex items-center space-x-1.5">
      <input
        type="checkbox"
        checked={currentResult.options.center}
        onChange={(ev) => {
          const checked = ev.target.checked;
          setCurrentResult({
            ...currentResult,
            options: {
              ...currentResult.options,
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
        checked={currentResult.options.compress}
        onChange={(ev) => {
          const checked = ev.target.checked;
          setCurrentResult({
            ...currentResult,
            options: {
              ...currentResult.options,
              compress: checked,
            },
          });
        }}
      />
      <span>Compress image</span>
    </label>
  );

  return (
    <div className="flex flex-col">
      {centerControl}
      {compressControl}

      {onClickApplyAll && (
        <div className="mt-2 text-left text-xs">
          <TextButton
            label="Apply to all images"
            onClick={onClickApplyAll}
          />
        </div>
      )}
    </div>
  );
}
