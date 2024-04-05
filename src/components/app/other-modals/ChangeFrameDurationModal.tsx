import ModalNumberPromptBody from '@/components/ui/modal/helpers/ModalNumberPromptBody';
import { S } from '@/lib/state/workspace/workspace-context/any-workspace-helper';

type ChangeFrameDurationModalProps = {
  applyToAll: boolean;
  close: () => void;
};

export default function ChangeFrameDurationModal({
  applyToAll,
  close,
}: ChangeFrameDurationModalProps) {
  const modifyActiveFrameDuration = S.useModifyActiveFrameDuration();
  const modifyActiveSequenceFrameDuration = S.useModifyActiveSequenceFrameDuration();

  return (
    <div>
      <ModalNumberPromptBody
        label={`Frame Duration ${applyToAll ? '(all frames)' : '(active frame)'}`}
        min={0}
        resolve={(result) => {
          if (result !== null) {
            if (applyToAll) {
              modifyActiveSequenceFrameDuration(result);
            }
            else {
              modifyActiveFrameDuration(result);
            }
          }

          close();
        }}
      />
    </div>
  );
}
