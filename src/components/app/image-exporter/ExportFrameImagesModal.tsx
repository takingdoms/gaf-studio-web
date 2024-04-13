import ExportFrameImages from '@/components/app/image-exporter/ExportFrameImages';

type ExportFrameImagesModalProps = {
  frameIndex?: number; // used only to export SUBFRAMES
  close: () => void;
};

export default function ExportFrameImagesModal({
  frameIndex,
  close,
}: ExportFrameImagesModalProps) {
  return (
    <ExportFrameImages
      frameIndex={frameIndex}
      onAbort={close}
    />
  );
}
