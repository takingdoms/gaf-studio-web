import TranspIndexStrategyControl from '@/components/app/importer/gaf-importer/options-selector/importers/TranspIndexStrategyControl';
import TransparencyStrategyControl from '@/components/app/importer/gaf-importer/options-selector/importers/TransparencyStrategyControl';
import { PngGafImporterConfig } from '@/lib/importing/image-importers/gaf/png-gaf-image-importer';

type PngGafImageImporterControlsProps = {
  config: PngGafImporterConfig;
  setConfig: (config: PngGafImporterConfig) => void;
};

export default function PngGafImageImporterControls({
  config,
  setConfig,
}: PngGafImageImporterControlsProps) {
  return (
    <div className="flex">
      <div className="flex-1">
        <div className="text-center text-xs text-gray-500 font-bold mb-0.5">
          Source Transparency
        </div>
        <TransparencyStrategyControl
          transparencyStrategy={config.transparencyStrategy}
          setTransparencyStrategy={(transparencyStrategy) => {
            setConfig({
              ...config,
              transparencyStrategy,
            });
          }}
        />
      </div>

      <div className="border-r border-gray-300 pl-2 mr-2" />

      <div className="flex-1">
        <div className="text-center text-xs text-gray-500 font-bold mb-0.5">
          Reserved Transparency Index
        </div>
        <TranspIndexStrategyControl
          transpIndexStrategy={config.transpIndexStrategy}
          setTranspIndexStrategy={(transpIndexStrategy) => {
            setConfig({
              ...config,
              transpIndexStrategy,
            });
          }}
          palette={config.palette}
        />
      </div>
    </div>
  );
}
