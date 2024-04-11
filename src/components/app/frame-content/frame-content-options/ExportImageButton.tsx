import { DownloadUtils } from "@/lib/downloading/download-utils";
import { Icons } from "@/lib/react/icons";
import { useGlobalConfigStore } from "@/lib/state/global-config/global-config-store";
import { S } from "@/lib/state/workspace/workspace-context/any-workspace-helper";
import { VirtualLayerData } from "@/lib/virtual-gaf/virtual-gaf";

export default function ExportImageButton() {
  const { entryIndex, frameIndex, subframeIndex } = S.useCursor();
  const activeFrame = S.useActiveFrame();
  const activePairSubFormat = useGlobalConfigStore((state) => state.activePairSubFormat);

  if (entryIndex === null || frameIndex === null) return; // <-- only exists for typing
  if (activeFrame === null) return;

  let layerData: VirtualLayerData | undefined;
  let frameData = activeFrame.frameData;

  if (frameData.kind === 'single') {
    layerData = frameData.layerData;
  }
  else if (subframeIndex !== null) {
    layerData = frameData.layers[subframeIndex].layerData;
  }

  const cls = layerData === undefined
    ? 'text-sky-600 opacity-30 cursor-not-allowed'
    : 'text-sky-600 hover:bg-slate-50';

  const fileName = subframeIndex === null
    ? `frame_${entryIndex + 1}_${frameIndex + 1}.png`
    : `frame_${entryIndex + 1}_${frameIndex + 1}_${subframeIndex + 1}.png`;

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
