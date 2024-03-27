import TextButton from '@/components/ui/button/TextButton';
import NumberControl from '@/components/ui/control/NumberControl';
import { AllowedFrameDataModification } from '@/lib/state/workspace/common/common-workspace-state';
import { BaseVirtualGafFrameData } from '@/lib/virtual-gaf/virtual-gaf';

type FrameDataControlsProps = {
  frameData: BaseVirtualGafFrameData;
  isSubframe: boolean;
  isGaf: boolean;
  modify: (mod: AllowedFrameDataModification) => void;
  collapsed?: boolean;
  onToggle?: () => void;
};

const thCls = 'w-1/2 text-left px-1 py-1 text-gray-700 whitespace-nowrap';
const tdCls = 'w-1/2 text-left px-1 py-1 font-mono';

export default function FrameDataControls({
  frameData,
  isSubframe,
  isGaf,
  modify,
  collapsed,
  onToggle,
}: FrameDataControlsProps) {
  // TODO shouldn't re-render when the activeSubframeIndex changes
  // console.log('Rendering FrameDataControls');

  const setXOffset = (newOffset: number) => {
    modify({ xOffset: newOffset, yOffset: frameData.yOffset });
  };

  const setYOffset = (newOffset: number) => {
    modify({ xOffset: frameData.xOffset, yOffset: newOffset });
  };

  const tableCls = collapsed !== undefined && collapsed ? 'hidden' : '';

  return (
    <div className="flex flex-col items-center">
      <div className="text-base text-center font-bold text-gray-700">
        {isSubframe
          ? 'Subframe Data'
          : 'Frame Data'}

          {collapsed !== undefined && onToggle !== undefined && (
            <div className="text-xs">
              <TextButton
                label={collapsed ? 'Expand' : 'Collapse'}
                onClick={onToggle}
              />
            </div>
          )}
      </div>

      <table className={tableCls}>
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
                setValue={setXOffset}
              />
            </td>
          </tr>
          <tr>
            <th className={thCls}>Y offset:</th>
            <td className={tdCls}>
              <NumberControl
                value={frameData.yOffset}
                setValue={setYOffset}
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
