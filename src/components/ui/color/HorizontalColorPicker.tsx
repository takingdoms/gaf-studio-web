import { ColorUtils } from '@/lib/utils/color-utils';
import { ColorRgb } from '@/lib/utils/utility-types';

type HorizontalColorPickerProps = {
  value: ColorRgb;
  setValue: (color: ColorRgb) => void;
};

export default function HorizontalColorPicker({ value, setValue }: HorizontalColorPickerProps) {
  return (
    <div className="flex items-center">
      <div className="mr-2">
        <input
          type="color"
          style={{ width: 32, height: 32 }}
          value={ColorUtils.rgbToHex(value)}
          onChange={(ev) => {
            const rgb = ColorUtils.hexToRgb(ev.target.value);
            console.log(rgb);
            if (rgb) {
              setValue(rgb);
            }
          }}
        />
      </div>
      <div className="grow flex justify-between items-center space-x-1 text-sm font-mono">
        <div>R: {value.r}</div>
        <div>G: {value.g}</div>
        <div>B: {value.b}</div>
      </div>
    </div>
  );
}
