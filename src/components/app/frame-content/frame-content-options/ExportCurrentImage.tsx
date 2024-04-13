import ExportImageButton from "@/components/ui/button/ExportImageButton";
import { DownloadUtils } from "@/lib/downloading/download-utils";
import { ImageNaming } from "@/lib/image-exporting/image-naming";
import { useGlobalConfigStore } from "@/lib/state/global-config/global-config-store";
import { S } from "@/lib/state/workspace/workspace-context/any-workspace-helper";
import { VirtualLayerData } from "@/lib/virtual-gaf/virtual-gaf";

export default function ExportCurrentImage() {
  const { entryIndex, frameIndex, subframeIndex } = S.useCursor();
  const activeEntryName = S.useActiveEntryName();
  const activeFrameFrameData = S.useActiveFrameFrameData();
  const activePairSubFormat = useGlobalConfigStore((state) => state.activePairSubFormat);

  if (entryIndex === null || frameIndex === null || activeEntryName === undefined) return;
  if (activeFrameFrameData === undefined) return;

  let layerData: VirtualLayerData | undefined;

  if (activeFrameFrameData.kind === 'single') {
    layerData = activeFrameFrameData.layerData;
  }
  else if (subframeIndex !== null) {
    layerData = activeFrameFrameData.layers[subframeIndex].layerData;
  }

  const fileName = ImageNaming.nameFrameOrSubframe({
    ext: 'png',
    entryNameOrIndex: activeEntryName,
    frameIndex,
    subframeIndex: subframeIndex ?? undefined,
  });

  return (
    <ExportImageButton
      disabled={layerData === undefined}
      onClick={() => {
        if (layerData === undefined) return;

        let image: ImageData;

        if (layerData.kind === 'palette-idx') {
          image = layerData.imageResource.compiledImage;
        }
        else if (layerData.kind === 'raw-colors') {
          image = layerData.imageResource.compiledImage;
        }
        else {
          const imgRes = activePairSubFormat === 'taf_1555'
            ? layerData.imageResource1555
            : layerData.imageResource4444;

          image = imgRes.compiledImage;
        }

        DownloadUtils.saveImageDataAsPng(image, fileName);
      }}
    />
  )
}
