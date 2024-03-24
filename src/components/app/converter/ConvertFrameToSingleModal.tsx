import SolidButton from '@/components/ui/button/SolidButton';
import { Icons } from '@/lib/react/icons';
import { S } from '@/lib/state/store/store-helper';

type ConvertFrameToSingleModalProps = {
  close: () => void;
};

export default function ConvertFrameToSingleModal({ close }: ConvertFrameToSingleModalProps) {
  const activeFrame = S.useStore()((state) => state.getActiveFrame());
  const activeFrameIndex = S.useStore()((state) => state.cursor.frameIndex);
  const doConvert = S.useStore()((state) => state.convertActiveFrameToSingleFrame);

  if (activeFrame === null) {
    return <div className="p-4">No frame selected.</div>;
  }

  if (activeFrame.frameData.kind === 'single') {
    return <div className="p-4">Frame is already Single-layered.</div>;
  }

  if (activeFrame.frameData.layers.length !== 1) {
    return <div className="p-4">
      Frame must have exactly <b>1</b> subframe to be converted into a Single-layered frame.
      <br />
      Currently, it has <b>{activeFrame.frameData.layers.length}</b> subframes.
    </div>
  }

  const framePos = activeFrameIndex! + 1;

  return (
    <div className="flex flex-col p-4">
      <div className="mb-1">
        Do you want to convert the active frame (#{framePos}) into a Single-layered frame?
      </div>

      <div className="flex items-center text-sm font-bold text-slate-500 mb-4">
        <Icons.Info
          className="mr-1"
          size={20}
        />
        The frame data of its first subframe will become the frame data of the new Single-layered frame.
      </div>

      <div className="flex justify-end space-x-2">
        <SolidButton
          color="success"
          onClick={() => {
            doConvert(false);
            close();
          }}
        >
          Convert
        </SolidButton>

        <SolidButton
          color="default"
          onClick={close}
        >
          Cancel
        </SolidButton>
      </div>
    </div>
  );
}
