import ExportGaf from "@/components/app/exporter/ExportGaf";
import ExportTafPair from "@/components/app/exporter/ExportTafPair";
import ExportTafSolo from "@/components/app/exporter/ExportTafSolo";
import { S } from "@/lib/state/workspace/workspace-context/any-workspace-helper";

type ExportProps = {
  onAbort: () => void;
  onEnded: () => void;
};

export type ExportFileName =
  | string // gaf or taf-solo
  | { 1555: string; 4444: string } // taf-pair
  | null; // projects created from blanl

export default function Export({
  onAbort,
  onEnded,
}: ExportProps) {
  const currentGaf = S.useCurrentGaf();
  const format = S.useFormat();

  let exportFileName: ExportFileName;

  if (currentGaf.kind === 'blank') {
    exportFileName = null;
  }
  else if (currentGaf.kind === 'from-file-single') {
    exportFileName = currentGaf.fileName;
  }
  else { // 'from-file-pair'
    exportFileName = {
      1555: currentGaf.data1555.fileName,
      4444: currentGaf.data4444.fileName,
    };
  }

  if (format === 'gaf') {
    return (
      <ExportGaf
        virtualGaf={currentGaf.virtualGaf}
        exportFileName={exportFileName}
        onAbort={onAbort}
        onEnded={onEnded}
      />
    );
  }
  else if (format === 'taf-solo') {
    return (
      <ExportTafSolo
        virtualGaf={currentGaf.virtualGaf}
        exportFileName={exportFileName}
        onAbort={onAbort}
        onEnded={onEnded}
      />
    );
  }

  return (
    <ExportTafPair
      virtualGaf={currentGaf.virtualGaf}
      exportFileName={exportFileName}
      onAbort={onAbort}
      onEnded={onEnded}
    />
  );
}
