import WorkspaceFormatPanel from "@/components/app/workspace-format/WorkspaceFormatPanel";
import WorkspaceInfoPanel from "@/components/app/workspace-info/WorkspaceInfoPanel";
import ResizablePair from "@/components/ui/misc/ResizablePair";
import PairSeparator from "@/components/ui/misc/PairSeparator";
import Panel from "@/components/ui/panel/Panel";

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
        <TempEntryList />
        {/* <div className="bg-black" style={{ height: 2000 }} /> */}
      </div>
    </div>
  );

  const middlePanel = (
    <TempControls />
  );

  const rightPanel = (
    <TempFrameViewer />
  );

  const rightPair = (
    <ResizablePair
      dir="H"
      childA={middlePanel}
      childB={rightPanel}
      dominantChild="B"
      subordinateChildMinSize={200}
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
          subordinateChildMinSize={300}
          subordinateChildMaxSize="50%"
        />
      </div>

      <PairSeparator dir="V" />

      <div className="flex flex-col">
        <TempFooter />
      </div>
    </div>
  );
}

function TempFooter() {
  return (
    <Panel>
      <div className="h-full p-4 flex justify-center items-center bg-white">
        Footer
      </div>
    </Panel>
  );
}

function TempControls() {
  return (
    <Panel>
      <div className="h-full p-4 flex justify-center items-center bg-white">
        Controls
      </div>
    </Panel>
  );
}

function TempFrameViewer() {
  return (
    <Panel>
      <div className="h-full p-4 flex justify-center items-center bg-white">
        Frames
      </div>
    </Panel>
  );
}

function TempEntryList() {
  return (
    <Panel>
      <div className="grow flex flex-col overflow-hidden bg-white">
        <div className="text-center mb-1">Entry List</div>
        <div className="grow overflow-auto">
          <table className="text-sm">
            <thead className="text-xs">
              <tr>
                <th className="px-2 py-1">Name</th>
                <th className="px-2 py-1">Animate</th>
                <th className="px-2 py-1">Frames</th>
                <th className="px-2 py-1">Subframes</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 30 }).map((_, index) => (
                <tr
                  key={index}
                >
                  <td className="px-2 py-1">Entry #{index + 1}</td>
                  <td className="px-2 py-1">Yes</td>
                  <td className="px-2 py-1">10</td>
                  <td className="px-2 py-1">20</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Panel>
  );
}
