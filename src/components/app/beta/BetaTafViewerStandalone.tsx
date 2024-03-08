import BetaTafViewer from "@/components/app/beta/BetaTafViewer";
import { useWorkspaceStore } from "@/lib/state/store/use-workspace-store";

export default function BetaTafViewerStandalone() {
  console.log('Rendering BetaTafViewerStandalone');

  const useTafStore = useWorkspaceStore('taf');

  if (useTafStore === null) {
    return;
  }

  return (
    <BetaTafViewer useTafStore={useTafStore} />
  );
}
