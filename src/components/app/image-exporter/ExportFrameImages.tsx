import ExportFrameImagesWizard from '@/components/app/image-exporter/ExportFrameImagesWizard';
import SolidButton from '@/components/ui/button/SolidButton';
import ModalPadding from '@/components/ui/modal/ModalPadding';
import { ImageExporter } from '@/lib/image-exporting/image-exporter';
import { ActualImage } from '@/lib/image/image-resource';
import { useGlobalConfigStore } from '@/lib/state/global-config/global-config-store';
import { S } from '@/lib/state/workspace/workspace-context/any-workspace-helper';
import { VirtualFrameDataSingleLayer, VirtualLayerData } from '@/lib/virtual-gaf/virtual-gaf';

type ExportFrameImagesProps = {
  entryIndex: number;
  frameIndex?: number; // used only to export SUBFRAMES
  onAbort: () => void;
};

export default function ExportFrameImages({
  entryIndex,
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

  const frames = activeEntry.frames;

  const items: ImageExporter.Item[] = [];

  if (frameIndex === undefined) {
    frames.forEach((frame, nextFrameIndex) => {
      const base = {
        entryIndex,
        entryName: activeEntry.name,
        frameIndex: nextFrameIndex,
      } satisfies Partial<ImageExporter.Item>;

      let subframeIndex: number | undefined;
      let layer: VirtualFrameDataSingleLayer;

      if (frame.frameData.kind === 'single') {
        layer = frame.frameData;
      } else if (frame.frameData.layers.length > 0) { // grabs the first subframe image!
        subframeIndex = 0;
        layer = frame.frameData.layers[0];
      } else {
        return;
      }

      let image: ActualImage;

      if (format === 'taf-pair') {
        image = (layer.layerData as VirtualLayerData<'taf-pair'>)[
          activePairSubFormat === 'taf_1555' ? 'imageResource1555' : 'imageResource4444'
        ].compiledImage;
      }
      else {
        image = (layer.layerData as VirtualLayerData<'gaf' | 'taf-solo'>).imageResource.compiledImage;
      }

      items.push({
        ...base,
        image,
        subframeIndex,
      });
    });
  }
  else {
    const frame = frames[frameIndex];

    if (frame.frameData.kind === 'single') {
      console.error(`Active frame lacks subframes!`);
      onAbort();
      return;
    }

    frame.frameData.layers.forEach((subframe, nextSubframeIndex) => {
      const base = {
        entryIndex,
        entryName: activeEntry.name,
        frameIndex,
        subframeIndex: nextSubframeIndex,
      } satisfies Partial<ImageExporter.Item>;

      let image: ActualImage;

      if (format === 'taf-pair') {
        image = (subframe.layerData as VirtualLayerData<'taf-pair'>)[
          activePairSubFormat === 'taf_1555' ? 'imageResource1555' : 'imageResource4444'
        ].compiledImage;
      }
      else {
        image = (subframe.layerData as VirtualLayerData<'gaf' | 'taf-solo'>).imageResource.compiledImage;
      }

      items.push({
        ...base,
        image,
      });
    });
  }

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
