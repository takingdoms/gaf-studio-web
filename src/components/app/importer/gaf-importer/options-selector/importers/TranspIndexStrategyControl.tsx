import ColorTile from "@/components/ui/color/ColorTile";
import NumberControlWithPrompt from "@/components/ui/control/NumberControlWithPrompt";
import Select from "@/components/ui/select/Select";
import { Palette } from "@/lib/image/palette/palette";
import { CommonGafImporterConfig } from "@/lib/importing/image-importers/gaf/common-gaf-importer";
import { ColorRgb } from "@/lib/utils/utility-types";

type TranspIndexStrategyControlProps = {
  transpIndexStrategy: CommonGafImporterConfig['transpIndexStrategy'];
  setTranspIndexStrategy: (transp: CommonGafImporterConfig['transpIndexStrategy']) => void;
  palette: Palette;
};

export default function TranspIndexStrategyControl({
  transpIndexStrategy,
  setTranspIndexStrategy,
  palette,
}: TranspIndexStrategyControlProps) {
  const mainOption = (
    <Select<CommonGafImporterConfig['transpIndexStrategy']['kind']>
      options={[
        {
          id: 'auto-assign',
          label: 'None (auto-assign)',
        },
        {
          id: 'fixed-index',
          label: 'Manual value',
        },
      ]}
      value={transpIndexStrategy.kind}
      onChange={(value) => {
        let newTranspIndexStrategy: CommonGafImporterConfig['transpIndexStrategy'];

        if (value === 'auto-assign') {
          newTranspIndexStrategy = {
            kind: 'auto-assign',
          };
        }
        else {
          newTranspIndexStrategy = {
            kind: 'fixed-index',
            fixedIndex: 9,
          };
        }

        setTranspIndexStrategy(newTranspIndexStrategy);
      }}
    />
  );

  if (transpIndexStrategy.kind === 'auto-assign') {
    return mainOption;
  }

  const transpIndex = transpIndexStrategy.fixedIndex;
  const palTranspColor: ColorRgb = {
    r: palette.rgbData[transpIndex * 3 + 0],
    g: palette.rgbData[transpIndex * 3 + 1],
    b: palette.rgbData[transpIndex * 3 + 2],
  };

  const indexSelect = (
    <div className="flex items-center space-x-2">
      <div className="flex items-center">
        <span className="text-xs text-gray-500 mr-1">Index:</span>
        <NumberControlWithPrompt
          min={0}
          max={255}
          promptMessage="Palette index:"
          value={transpIndex}
          setValue={(value) => {
            setTranspIndexStrategy({
              kind: 'fixed-index',
              fixedIndex: value,
            });
          }}
        />
      </div>

      <div className="flex items-center">
        <span className="text-xs text-gray-500 mr-1">Color:</span>
        <ColorTile color={palTranspColor} size={16} />
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-1">
        {mainOption}
      </div>

      {indexSelect}
    </div>
  );
}
