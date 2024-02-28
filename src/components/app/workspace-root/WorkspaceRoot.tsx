import ControlsPanel from "@/components/app/controls/ControlsPanel";
import EntryListPanel from "@/components/app/entry-list/EntryListPanel";
import FrameViewerPanel from "@/components/app/frame-viewer/FrameViewerPanel";
import WorkspaceFormatPanel from "@/components/app/workspace-format/WorkspaceFormatPanel";
import WorkspaceInfoPanel from "@/components/app/workspace-info/WorkspaceInfoPanel";
import PairSeparator from "@/components/ui/misc/PairSeparator";
import ResizablePair from "@/components/ui/misc/ResizablePair";
// import Panel from "@/components/ui/panel/Panel";

export default function WorkspaceRoot() {
  const leftPanel = (
    <div className="grow flex flex-col overflow-hidden">
      <div className="flex flex-col">
        <WorkspaceFormatPanel />
      </div>
      <PairSeparator dir="V" />
      <div className="flex flex-col">
        <WorkspaceInfoPanel />
      </div>
      <PairSeparator dir="V" />
      <div className="grow flex flex-col overflow-hidden">
        <EntryListPanel />
      </div>
    </div>
  );

  const middlePanel = (
    <ControlsPanel />
  );

  const rightPanel = (
    <FrameViewerPanel />
  );

  const rightPair = (
    <ResizablePair
      dir="H"
      childA={middlePanel}
      childB={rightPanel}
      dominantChild="B"
      subordinateChildMinSize={260}
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

      {/* <PairSeparator dir="V" />

      <div className="flex flex-col">
        <TempFooter />
      </div> */}
    </div>
  );
}

/*function TempFooter() {
  return (
    <Panel>
      <div className="h-full p-4 flex justify-center items-center bg-white">
        Footer
      </div>
    </Panel>
  );
}*/
