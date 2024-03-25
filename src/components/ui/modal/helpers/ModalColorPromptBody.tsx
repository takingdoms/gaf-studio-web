import SolidButton from "@/components/ui/button/SolidButton";
import NumberControl from "@/components/ui/control/NumberControl";
import { ModalColorPromptResult } from "@/components/ui/modal/helpers/modalColorPrompt";
import { ColorRgba } from "@/lib/utils/utility-types";
import React from 'react';

type ModalColorPromptBodyProps = {
  label: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  defaultColor: ColorRgba; // alpha is ignored when enableAlpha === false
  enableAlpha: boolean;
  resolve: (result: ModalColorPromptResult) => void;
};

export default function ModalColorPromptBody({
  label,
  confirmLabel,
  cancelLabel,
  defaultColor,
  enableAlpha,
  resolve,
}: ModalColorPromptBodyProps) {
  const [color, setColor] = React.useState(defaultColor);

  const colorStr = `rgba(${color.r}, ${color.g}, ${color.b}, ${enableAlpha ? (color.a / 255) : 1})`;

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-2">
        {label}
      </div>

      <div className="flex items-center mb-4">
        <div
          className="mr-4"
          style={{
            background: colorStr,
            width: 48,
            height: 48,
          }}
        />

        <div className="flex flex-col space-y-1">
          <ColorInput
            sample="r"
            color={color}
            setColor={setColor}
          />
          <ColorInput
            sample="g"
            color={color}
            setColor={setColor}
          />
          <ColorInput
            sample="b"
            color={color}
            setColor={setColor}
          />
          {enableAlpha && (
            <ColorInput
              sample="a"
              color={color}
              setColor={setColor}
            />
          )}
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <SolidButton
          color="success"
          onClick={() => resolve(color)}
        >
          {confirmLabel ?? 'Confirm'}
        </SolidButton>
        <SolidButton
          color="danger"
          onClick={() => resolve(null)}
        >
          {cancelLabel ?? 'Cancel'}
        </SolidButton>
      </div>
    </div>
  );
}

function ColorInput({
  sample,
  color,
  setColor,
}: {
  sample: keyof ColorRgba;
  color: ColorRgba;
  setColor: (color: ColorRgba) => void;
}) {
  const value = color[sample];

  return (
    <div className="flex">
      <div className="font-mono mr-2">
        {sample.toUpperCase()}:
      </div>

      <NumberControl
        min={0}
        max={255}
        value={value}
        setValue={(newValue) => {
          setColor({
            ...color,
            [sample]: newValue,
          });
        }}
      />
    </div>
  );
}
