import Panel from '@/components/ui/panel/Panel';
import { S } from '@/lib/state/workspace/workspace-context/any-workspace-helper';
import { TafSoloS } from '@/lib/state/workspace/workspace-context/taf-solo-workspace-helper';

export default function WorkspaceFormatPanel() {
  // console.log('Rendering WorkspaceFormatPanel');

  const format = S.useFormat();

  const bgCls
    = format === 'gaf' ? 'border-orange-300 bg-orange-200 text-orange-700'
    : format === 'taf-pair' ? 'border-violet-300 bg-violet-200 text-violet-700'
    : 'border-red-300 bg-red-200 text-red-700';

  return (
    <Panel>
      <div
        className={`p-1 text-center text-sm font-bold bg-gradient-to-b border-2 ${bgCls}`}
      >
        <span>Current format:{' '}</span>
        <span>
          {
            format === 'gaf' ? 'GAF' :
            format === 'taf-pair' ? 'TAF Pair' :
            <TafSubFormat /> // taf-solo
          }
        </span>
      </div>
    </Panel>
  );
}

function TafSubFormat() {
  const subFormat = TafSoloS.useSubFormat();
  const label = subFormat === 'taf_1555' ? '1555' : '4444';
  return `TAF Solo (${label})`;
}
