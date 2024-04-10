import { ExportFileName } from "@/components/app/exporter/Export";
import ExportWizard from "@/components/app/exporter/common/ExportWizard";
import { TafPairBuildExporter } from "@/lib/exporting/taf-pair-build-exporter";
import { VirtualGaf } from "@/lib/virtual-gaf/virtual-gaf";

type ExportTafPairProps = {
  exportFileName: ExportFileName;
  virtualGaf: VirtualGaf;
  onAbort: () => void;
  onEnded: () => void;
};

export default function ExportTafPair({
  exportFileName,
  virtualGaf,
  onAbort,
  onEnded,
}: ExportTafPairProps) {
  const exporter = new TafPairBuildExporter();

  return (
    <ExportWizard
      exportFileName={exportFileName}
      virtualGaf={virtualGaf}
      exporter={exporter}
      onAbort={onAbort}
    />
  );
}
