import { ExportFileName } from "@/components/app/exporter/Export";
import ExportWizard from "@/components/app/exporter/common/ExportWizard";
import { TafSoloBuildExporter } from "@/lib/exporting/taf-solo-build-exporter";
import { TafSoloS } from "@/lib/state/workspace/workspace-context/taf-solo-workspace-helper";
import { VirtualGaf } from "@/lib/virtual-gaf/virtual-gaf";

type ExportTafSoloProps = {
  exportFileName: ExportFileName;
  virtualGaf: VirtualGaf;
  onAbort: () => void;
  onEnded: () => void;
};

export default function ExportTafSolo({
  exportFileName,
  virtualGaf,
  onAbort,
  onEnded,
}: ExportTafSoloProps) {
  const subFormat = TafSoloS.useSubFormat();
  const exporter = new TafSoloBuildExporter(subFormat);

  return (
    <ExportWizard
      exportFileName={exportFileName}
      virtualGaf={virtualGaf}
      exporter={exporter}
      onAbort={onAbort}
    />
  );
}
