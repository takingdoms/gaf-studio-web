import ExportFrameImages from '@/components/app/image-exporter/ExportFrameImages';

type ExportFrameImagesModalProps = {
  entryIndex: number;
  frameIndex?: number; // used only to export SUBFRAMES
  close: () => void;
};

export default function ExportFrameImagesModal({
  entryIndex,
  frameIndex,
  close,
}: ExportFrameImagesModalProps) {
  return (
    <ExportFrameImages
      entryIndex={entryIndex}
      frameIndex={frameIndex}
      onAbort={close}
    />
  );
}
