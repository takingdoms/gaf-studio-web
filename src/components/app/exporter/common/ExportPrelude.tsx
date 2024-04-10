import SolidButton from '@/components/ui/button/SolidButton';
import ModalPadding from '@/components/ui/modal/ModalPadding';
import { Icons } from '@/lib/react/icons';

type ExportPreludeProps = {
  onNext: () => void;
  onAbort: () => void;
};

export default function ExportPrelude({ onNext, onAbort }: ExportPreludeProps) {
  return (
    <ModalPadding>
      <div className="flex items-center mb-2">
        <Icons.Warning
          className="text-orange-600 mr-4"
          size={32}
        />
        <div>
          This software is experimental, please make sure to <b>back up</b> your original files
          <br />
          before proceeding.
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <SolidButton
          color="success"
          onClick={onNext}
        >
          Export
        </SolidButton>
        <SolidButton
          color="default"
          onClick={onAbort}
        >
          Cancel
        </SolidButton>
      </div>
    </ModalPadding>
  );
}
