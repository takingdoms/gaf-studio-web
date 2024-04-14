import ExportEveryImageWizard from '@/components/app/image-exporter/ExportEveryImageWizard';
import SolidButton from '@/components/ui/button/SolidButton';
import ModalPadding from '@/components/ui/modal/ModalPadding';
import { ImageExporter } from '@/lib/image-exporting/image-exporter';
import { ImageNaming } from '@/lib/image-exporting/image-naming';
import { useGlobalConfigStore } from '@/lib/state/global-config/global-config-store';
import { S } from '@/lib/state/workspace/workspace-context/any-workspace-helper';

type ExportEveryImageProps = {
  onAbort: () => void;
};

export default function ExportEveryImage({ onAbort }: ExportEveryImageProps) {
  const format = S.useFormat();
  const currentGaf = S.useCurrentGaf();
  const activePairSubFormat = useGlobalConfigStore((state) => state.activePairSubFormat);

  let itemTreeWrapper: ImageExporter.ItemTreeWrapper;

  try {
    itemTreeWrapper = ImageExporter.currentGafToItemTreeWrapper({
      currentGaf,
      format,
      activePairSubFormat,
    });
  } catch (err) {
    return (
      <ModalPadding>
        <div className="font-semibold text-red-600 mb-1">Fatal error:</div>
        <div className="mb-4">{err + ''}</div>
        <div className="flex justify-end">
          <SolidButton onClick={onAbort}>
            Close
          </SolidButton>
        </div>
      </ModalPadding>
    );
  }

  let isEmpty: boolean;

  if (itemTreeWrapper.kind === 'taf-pair') {
    const { taf_1555, taf_4444 } = itemTreeWrapper;
    isEmpty = ImageExporter.isTreeEmpty(taf_1555.tree) && ImageExporter.isTreeEmpty(taf_4444.tree);
  }
  else {
    isEmpty = ImageExporter.isTreeEmpty(itemTreeWrapper.tree);
  }

  if (isEmpty) {
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
    <ExportEveryImageWizard
      itemTreeWrapper={itemTreeWrapper}
      onAbort={onAbort}
    />
  );
}
