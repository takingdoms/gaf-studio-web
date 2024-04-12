import { DownloadUtils } from "@/lib/downloading/download-utils";
import { Icons } from "@/lib/react/icons";
import { useGlobalConfigStore } from "@/lib/state/global-config/global-config-store";
import { S } from "@/lib/state/workspace/workspace-context/any-workspace-helper";
import { VirtualLayerData } from "@/lib/virtual-gaf/virtual-gaf";

export default function ExportImageButton() {
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

  const cls = layerData === undefined
    ? 'text-sky-600 opacity-30 cursor-not-allowed'
    : 'text-sky-600 hover:bg-slate-50';

  // TODO put the image file naming logic elsewhere (which can be shared)
  const entryIdx = (entryIndex + 1).toString().padStart(3, '0');
  const frameIdx = (frameIndex + 1).toString().padStart(3, '0');

  let fileName: string;

  if (subframeIndex === null) {
    fileName = `${activeEntryName}.${entryIdx}.${frameIdx}.png`;
  }
  else {
    const subframeIdx = (subframeIndex + 1).toString().padStart(3, '0');
    fileName = `${activeEntryName}.${entryIdx}.${frameIdx}.${subframeIdx}.png`;
  }

  return (
    <button
      className={`${cls} flex items-center px-1.5 py-1 text-xs font-semibold rounded-tl rounded-tr`}
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
    >
      <Icons.ExportImage
        className="mr-1"
        size={16}
      />
      Export
    </button>
  );
}
