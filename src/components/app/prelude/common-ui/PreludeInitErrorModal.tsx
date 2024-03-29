import ModalPadding from '@/components/ui/modal/ModalPadding';
import { Icons } from '@/lib/react/icons';
import { VirtualGafPairResultError } from '@/lib/virtual-gaf/virtual-gaf-conversion';
import { WorkspaceInitError } from '@/lib/workspace-state-initializer/workspace-init-result';

type PreludeInitErrorModalProps = {
  format: 'gaf' | 'taf-pair' | 'taf-solo';
  error: WorkspaceInitError;
  close: () => void;
};

export default function PreludeInitErrorModal({ format, error, close }: PreludeInitErrorModalProps) {
  const formatName = format === 'gaf' ? 'GAF' : 'TAF';

  let msgMain: string;
  let msgSub: string | undefined;
  let msgTechnical: string | undefined;
  let msgExtraNode: React.ReactNode | undefined;

  if (error.kind === 'error-reading-gaf') {
    msgMain = `Failed to parse the file provided. Are you sure this is a valid ${formatName} file?`;
    if (error.message !== undefined) msgSub = error.message;
    msgTechnical = getErrorMessage(error.error);
  }
  else if (error.kind === 'invalid-format') {
    msgMain = `Invalid file format.`;
    if (error.detectedFormat.mainFormat === 'gaf') {
      msgSub = `Expected a ${formatName} file but got a GAF file.`;
    }
    else {
      if (format === 'gaf') {
        msgSub = `Expected a GAF file but got a TAF file.`;
      }
      else if (format === 'taf-pair') {
        const expectedSub = error.detectedFormat.subFormat === 'taf_1555' ? '_4444' : '_1555';
        const gotSub = error.detectedFormat.subFormat === 'taf_1555' ? '_1555' : '_4444';
        msgSub = `Expected a ${expectedSub} file but got a ${gotSub} file.`;
      }
      else {
        const unexpected = error.detectedFormat.subFormat ?? error.detectedFormat.mainFormat;
        msgSub = `Didn't expect a ${unexpected} file.`;
      }
    }
  }
  else if (error.kind === 'tafs-out-of-sync') {
    msgMain = `The TAFs provided are not compatible with each other.`;
    msgSub = error.error.message;
    msgExtraNode = <OutOfSyncDetails error={error.error} />;
  }
  else { // error.kind === 'error-other'
    msgMain = error.message ?? `Unknown error.`;
    msgTechnical = getErrorMessage(error.error);
  }

  return (
    <ModalPadding>
      <div className="flex flex-col items-center space-y-2">
        <div className="text-lg font-semibold">{msgMain}</div>
        {msgSub !== undefined && (
          <div>{msgSub}</div>
        )}
        {msgTechnical !== undefined && (
          <div
            className="text-sm text-slate-700 bg-slate-100 border border-slate-200 font-mono
              px-1 py-0.5"
            style={{ maxWidth: '50vw' }}
          >
            {msgTechnical}
          </div>
        )}
        {msgExtraNode}
      </div>
    </ModalPadding>
  );
}

function getErrorMessage(error: unknown): string | undefined {
  if (error !== null && typeof error === 'object' && 'message' in error
    && typeof error['message'] === 'string')
  {
    return error.message;
  }
}

const tdCls = 'px-1.5 py-0.5 font-mono';
const thCls = 'px-1.5 py-0.5 font-semibold text-right';

function OutOfSyncDetails({ error }: { error: VirtualGafPairResultError }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-4">
        Here's where the difference occurred:
      </div>
      <table>
        <tbody>
          <tr>
            <th className={thCls}>Path:</th>
            <td className={tdCls}>
              {error.path && (
                <div
                  className="flex flex-wrap items-center -mb-1"
                  style={{ maxWidth: '50vw' }}
                >
                  {error.path.map((pathNode, index, arr) => (
                    <div
                      key={index}
                      className="flex items-center text-sm mb-1"
                    >
                      <div className="bg-slate-100 border border-slate-300 px-1.5 py-0.5 rounded mr-1.5">
                        <span>{pathNode.name}</span>{' '}
                        <span title="1-indexed">#{pathNode.pos + 1}</span>
                      </div>
                      {index < arr.length - 1 && (
                        <div className="mr-1.5">
                          <Icons.ArrowRight className="text-slate-300" size={18} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </td>
          </tr>
          <tr>
            <th className={thCls}>Property:</th>
            <td className={tdCls}>{error.valueName}</td>
          </tr>
          <tr>
            <th className={thCls}>Value 1555:</th>
            <td className={tdCls}>{error.value1555}</td>
          </tr>
          <tr>
            <th className={thCls}>Value 4444:</th>
            <td className={tdCls}>{error.value4444}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
