import ColorTile from "@/components/ui/color/ColorTile";
import Select from "@/components/ui/select/Select";
import { CommonGafImporterConfig } from "@/lib/importing/image-importers/gaf/common-gaf-importer";
import { ColorRgb, ColorRgba } from "@/lib/utils/utility-types";
import React from "react";

type TransparencyStrategyControlProps = {
  transparencyStrategy: CommonGafImporterConfig['transparencyStrategy'];
  setTransparencyStrategy: (transp: CommonGafImporterConfig['transparencyStrategy']) => void;
};

export default function TransparencyStrategyControl({
  transparencyStrategy,
  setTransparencyStrategy,
}: TransparencyStrategyControlProps) {
  const onClickColorSelect = React.useCallback((currentColor: ColorRgb | ColorRgba) => {
    // TODO open modal with prompt to select a new color!
  }, []);

  const mainSelect = (
    <Select<CommonGafImporterConfig['transparencyStrategy']['kind']>
      options={[
        {
          id: 'auto-alpha',
          label: 'Auto (alpha)',
        },
        {
          id: 'custom-color',
          label: 'Custom color',
        },
      ]}
      value={transparencyStrategy.kind}
      onChange={(value) => {
        let newTransparencyStrategy: CommonGafImporterConfig['transparencyStrategy'];

        if (value === 'auto-alpha') {
          newTransparencyStrategy = {
            kind: 'auto-alpha',
          };
        }
        else {
          newTransparencyStrategy = {
            kind: 'custom-color',
            color: { r: 255, g: 0, b: 255 },
          };
        }

        setTransparencyStrategy(newTransparencyStrategy);
      }}
    />
  );

  if (transparencyStrategy.kind === 'auto-alpha') {
    return mainSelect;
  }

  const { color } = transparencyStrategy;

  const colorSelect = (
    <div
      className="flex items-center hover:bg-gray-200 cursor-pointer px-1.5 py-0.5 rounded"
      onClick={() => onClickColorSelect(color)}
      title="Click to select a color"
    >
      <div className="mr-4">
        <ColorTile color={color} size={16} />
      </div>

      <div className="grow flex flex-col">
        <div className="flex justify-between text-sm font-mono mb-0.5 space-x-2">
          <div className="text-red-700">R: {color.r}</div>
          <div className="text-green-700">G: {color.g}</div>
          <div className="text-blue-700">B: {color.b}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-1">
        {mainSelect}
      </div>
      {colorSelect}
    </div>
  );
}
