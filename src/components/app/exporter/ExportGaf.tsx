import { ExportFileName } from "@/components/app/exporter/Export";
import ExportWizard from "@/components/app/exporter/common/ExportWizard";
import { GafBuildExporter } from "@/lib/exporting/gaf-build-exporter";
import { VirtualGaf } from "@/lib/virtual-gaf/virtual-gaf";

type ExportGafProps = {
  exportFileName: ExportFileName;
  virtualGaf: VirtualGaf;
  onAbort: () => void;
  onEnded: () => void;
};

export default function ExportGaf({
  exportFileName,
  virtualGaf,
  onAbort,
  onEnded,
}: ExportGafProps) {
  const exporter = new GafBuildExporter();

  return (
    <ExportWizard
      exportFileName={exportFileName}
      virtualGaf={virtualGaf}
      exporter={exporter}
      onAbort={onAbort}
    />
  );
}
