import NumberControl from '@/components/ui/control/NumberControl';
import NumberControlInput from '@/components/ui/control/NumberControlInput';
import { NumberControlSideButton } from '@/components/ui/control/NumberControlSideButton';
import { VirtualGafFrameData } from '@/lib/gaf-studio/virtual-gaf/virtual-gaf';
import { DeepReadonly } from 'ts-essentials';

type FrameDataControlsProps = DeepReadonly<{
  frameData: VirtualGafFrameData;
  isSubframe: boolean;
  isGaf: boolean;
}>;

const thCls = 'w-1/2 text-left px-1 py-1 text-gray-700 whitespace-nowrap';
const tdCls = 'w-1/2 text-left px-1 py-1 font-mono';

export default function FrameDataControls({
  frameData,
  isSubframe,
  isGaf,
}: FrameDataControlsProps) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="text-base text-center font-bold text-gray-700">
        {isSubframe
          ? 'Subframe Data'
          : 'Frame Data'}
      </div>

      <table className="">
        <tbody>
          <tr>
            <th className={thCls}>Width:</th>
            <td className={tdCls}>
              {frameData.width}
            </td>
          </tr>
          <tr>
            <th className={thCls}>Height:</th>
            <td className={tdCls}>
              {frameData.height}
            </td>
          </tr>
          <tr>
            <th className={thCls}>X offset:</th>
            <td className={tdCls}>
              <NumberControl
                value={frameData.xOffset}
                setValue={() => {}}
              />
            </td>
          </tr>
          <tr>
            <th className={thCls}>Y offset:</th>
            <td className={tdCls}>
              <NumberControl
                value={frameData.yOffset}
                setValue={() => {}}
              />
            </td>
          </tr>
          <tr>
            <th className={thCls}>Unknown2:</th>
            <td className={tdCls}>
              {frameData.unknown2}
            </td>
          </tr>
          <tr>
            <th className={thCls}>Unknown3:</th>
            <td className={tdCls}>
              {frameData.unknown3}
            </td>
          </tr>
          {isGaf && (<tr>
            <th
              className={thCls}
              title="Transparency Index"
            >
              Transp. idx:
            </th>
            <td className={tdCls}>
              {frameData.transparencyIndex}
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}
