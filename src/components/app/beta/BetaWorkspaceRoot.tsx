import BetaEntries from "@/components/app/beta/BetaEntries";
import BetaTafChanger from "@/components/app/beta/BetaTafChanger";
import BetaTafViewer from "@/components/app/beta/BetaTafViewer";
import { useWorkspaceStore } from "@/lib/state/store/use-workspace-store";

export default function BetaWorkspaceRoot() {
  console.log('Rendering BetaWorkspaceRoot');

  const format = useWorkspaceStore()((state) => state.format);

  const useTafStore = useWorkspaceStore('taf');
  const useGafStore = useWorkspaceStore('gaf');

  return (
    <div className="h-full p-4 overflow-auto">
      <div className="mb-4">
        <b>Format:</b> {format}
      </div>

      <div className="border border-slate-300 p-4 mb-4">
        {useTafStore && (
          <div className="mb-4">
            <BetaTafViewer useTafStore={useTafStore} />
            <BetaTafChanger useTafStore={useTafStore} />
          </div>
        )}

        {useGafStore && (
          <div className="mb-4">
            ...
          </div>
        )}
      </div>

      <div className="border border-slate-300 p-4 mb-4">
        <div className="mb-2 font-bold">Entries</div>

        <BetaEntries />
      </div>
    </div>
  );
}
