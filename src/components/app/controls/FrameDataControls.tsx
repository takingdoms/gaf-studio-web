import LibGaf from 'lib-gaf';
import { DeepReadonly } from 'ts-essentials';

type FrameDataControlsProps = DeepReadonly<{
  frameData: LibGaf.GafFrameData;
}>;

const thCls = 'text-left px-1 py-1 text-gray-700';
const tdCls = 'px-1 py-0.5 font-mono';

export default function FrameDataControls({ frameData }: FrameDataControlsProps) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="text-base text-center font-bold text-gray-700">Frame Data</div>

      <table className="self-center">
        <tbody>
          <tr>
            <th className={thCls}>Width:</th>
            <td className={tdCls}>{frameData.width}</td>
          </tr>
          <tr>
            <th className={thCls}>Height:</th>
            <td className={tdCls}>{frameData.height}</td>
          </tr>
          <tr>
            <th className={thCls}>X offset:</th>
            <td className={tdCls}>{frameData.xOffset}</td>
          </tr>
          <tr>
            <th className={thCls}>Y offset:</th>
            <td className={tdCls}>{frameData.yOffset}</td>
          </tr>
          <tr>
            <th className={thCls}>Unknown2:</th>
            <td className={tdCls}>
              {frameData.unknown2} {/*({FormatUtils.hex(frameData.unknown2)})*/}
            </td>
          </tr>
          <tr>
            <th className={thCls}>Unknown3:</th>
            <td className={tdCls}>
              {frameData.unknown3} {/*({FormatUtils.hex(frameData.unknown3)})*/}
            </td>
          </tr>
          {/* <tr>
            <th className={thCls}>Transparency index:</th>
            <td className={tdCls}>{frameData.transparencyIndex}</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}
