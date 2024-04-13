import ExportFrameImagesWizard from '@/components/app/image-exporter/ExportFrameImagesWizard';
import SolidButton from '@/components/ui/button/SolidButton';
import ModalPadding from '@/components/ui/modal/ModalPadding';
import { ImageExporter } from '@/lib/image-exporting/image-exporter';
import { useGlobalConfigStore } from '@/lib/state/global-config/global-config-store';
import { S } from '@/lib/state/workspace/workspace-context/any-workspace-helper';

type ExportFrameImagesProps = {
  frameIndex?: number; // used only to export SUBFRAMES
  onAbort: () => void;
};

export default function ExportFrameImages({
  frameIndex,
  onAbort,
}: ExportFrameImagesProps) {
  const format = S.useFormat();
  const activeEntry = S.useActiveEntry();
  const activePairSubFormat = useGlobalConfigStore((state) => state.activePairSubFormat);

  if (activeEntry === null) {
    onAbort();
    return;
  }

  const items = ImageExporter.framesToItems({
    entryName: activeEntry.name,
    frames: activeEntry.frames,
    frameIndex,
    format,
    activePairSubFormat,
  });

  if (items.length === 0) {
    return (
      <ModalPadding>
        <div className="mb-4">Nothing to export.</div>
        <div className="flex justify-end">
          <SolidButton onClick={onAbort}>
            Close
          </SolidButton>
        </div>
      </ModalPadding>
    );
  }

  return (
    <ExportFrameImagesWizard
      mode={frameIndex === undefined ? 'frames' : 'subframes'}
      items={items}
      onAbort={onAbort}
    />
  );
}
