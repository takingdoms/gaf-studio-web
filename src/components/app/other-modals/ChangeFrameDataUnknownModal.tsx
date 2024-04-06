import ModalNumberPromptBody from '@/components/ui/modal/helpers/ModalNumberPromptBody';
import { S } from '@/lib/state/workspace/workspace-context/any-workspace-helper';

type ChangeFrameDataUnknownModalProps = {
  target: 'active-frame' | 'active-subframe';
  field: 'unknown2' | 'unknown3';
  close: () => void;
};

export default function ChangeFrameDataUnknownModal({
  target,
  field,
  close,
}: ChangeFrameDataUnknownModalProps) {
  const modifyActiveFrameData = S.useModifyActiveFrameData();
  const modifyActiveSubframeData = S.useModifyActiveSubframeData();

  const fn = target === 'active-frame' ? modifyActiveFrameData : modifyActiveSubframeData;

  return (
    <div>
      <ModalNumberPromptBody
        label={field === 'unknown2' ? 'Unknown2' : 'Unknown3'}
        resolve={(result) => {
          if (result !== null) {
            fn({
              [field]: result,
            });
          }

          close();
        }}
      />
    </div>
  );
}
