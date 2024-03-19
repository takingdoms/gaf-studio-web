import { ImporterResultWrapper } from '@/lib/importing/image-importer';
import { GafImporterResult } from '@/lib/importing/image-importers/gaf/gaf-image-importer';

type ImportGafConversionStatsProps = {
  resultWrapper: ImporterResultWrapper<GafImporterResult> & { kind: 'success' | 'warning' };
};

export default function ImportGafConversionStats({
  resultWrapper,
}: ImportGafConversionStatsProps) {
  //

  return (
    <div>
      TODO
    </div>
  );
}
