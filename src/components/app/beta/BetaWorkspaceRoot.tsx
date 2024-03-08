import BetaTafChanger from "@/components/app/beta/BetaTafChanger";
import BetaTafViewer from "@/components/app/beta/BetaTafViewer";
import BetaTafViewerStandalone from "@/components/app/beta/BetaTafViewerStandalone";
import { useWorkspaceStore } from "@/lib/state/store/use-workspace-store";

export default function BetaWorkspaceRoot() {
  console.log('Rendering BetaWorkspaceRoot');

  const format = useWorkspaceStore()((state) => state.format);

  const useTafStore = useWorkspaceStore('taf');
  const useGafStore = useWorkspaceStore('gaf');

  return (
    <div>
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

      <div className="mb-4">
        <BetaTafViewerStandalone />
      </div>
    </div>
  );
}
