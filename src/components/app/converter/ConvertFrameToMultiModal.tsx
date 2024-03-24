import SolidButton from '@/components/ui/button/SolidButton';
import { Icons } from '@/lib/react/icons';
import { S } from '@/lib/state/store/store-helper';

type ConvertFrameToMultiModalProps = {
  close: () => void;
};

export default function ConvertFrameToMultiModal({ close }: ConvertFrameToMultiModalProps) {
  const activeFrame = S.useStore()((state) => state.getActiveFrame());
  const activeFrameIndex = S.useStore()((state) => state.cursor.frameIndex);
  const doConvert = S.useStore()((state) => state.convertActiveFrameToMultiFrame);

  if (activeFrame === null) {
    return <div className="p-4">No frame selected.</div>;
  }

  if (activeFrame.frameData.kind === 'multi') {
    return <div className="p-4">Frame is already Multi-layered.</div>;
  }

  const framePos = activeFrameIndex! + 1;

  return (
    <div className="flex flex-col p-4">
      <div className="mb-1">
        Do you want to convert the active frame (#{framePos}) into a Multi-layered frame?
      </div>

      <div className="flex items-center text-sm font-bold text-slate-500 mb-4">
        <Icons.Info
          className="mr-1"
          size={20}
        />
        Its existing frame data will become the first subframe of the new Multi-layered frame.
      </div>

      <div className="flex space-x-2">
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
