import ControlsPanel from "@/components/app/controls/ControlsPanel";
import FileMapViewer from "@/components/app/file-map-viewer/FileMapViewer";
import FrameViewerPanel from "@/components/app/frame-viewer/FrameViewerPanel";
import WorkspaceAndEntriesPanel from "@/components/app/workspace-root/WorkspaceAndEntriesPanel";
import ResizablePair from "@/components/ui/misc/ResizablePair";

export default function WorkspaceRoot() {
  // console.log('Rendering WorkspaceRoot');

  const leftPanel = (
    <WorkspaceAndEntriesPanel />
  );

  const middlePanel = (
    <ControlsPanel />
  );

  const rightPanel = (
    <FrameViewerPanel />
    // <div className="grow overflow-auto"><FileMapViewer /></div>
  );

  const rightPair = (
    <ResizablePair
      dir="H"
      childA={middlePanel}
      childB={rightPanel}
      dominantChild="B"
      subordinateChildMinSize={300}
      subordinateChildMaxSize="50%"
    />
  );

  return (
    <div className="h-full flex flex-col">
      <div className="grow flex flex-col overflow-hidden">
        <ResizablePair
          dir="H"
          childA={leftPanel}
          childB={rightPair}
          dominantChild="B"
          subordinateChildMinSize={320}
          subordinateChildMaxSize="50%"
        />
      </div>
    </div>
  );
}
