import WorkspaceFormatPanel from "@/components/app/workspace-format/WorkspaceFormatPanel";
import WorkspaceInfoPanel from "@/components/app/workspace-info/WorkspaceInfoPanel";
import Panel from "@/components/ui/panel/Panel";

export default function WorkspaceRoot() {
  return (
    // <div className="h-full overflow-auto">
    <div className="h-full flex flex-col">
      <Row expand>
        <Col width={250}>
          <Row>
            <Col expand>
              <WorkspaceFormatPanel />
            </Col>
          </Row>
          <RowSeparator />
          <Row>
            <Col expand>
              <WorkspaceInfoPanel />
            </Col>
          </Row>
          <RowSeparator />
          <Row expand>
            <Col expand>
              <TempEntryList />
            </Col>
          </Row>
        </Col>
        <ColSeparator draggable />
        <Col width={250}>
          <TempControls />
        </Col>
        <ColSeparator draggable />
        <Col expand>
          <TempFrameViewer />
        </Col>
      </Row>

      <RowSeparator />

      <Row>
        <Col expand>
          <TempFooter />
        </Col>
      </Row>
    </div>
    // </div>
  );
}

function Row({
  children,
  expand,
}: {
  children: React.ReactNode;
  expand?: boolean;
}) {
  return (
    <div className={`${expand ? 'grow overflow-hidden' : ''} flex`}>
      {children}
    </div>
  );
}

function Col({
  children,
  expand,
  width,
}: {
  children: React.ReactNode;
  expand?: boolean;
  width?: number;
}) {
  return (
    <div
      className={`${expand ? 'grow overflow-hidden' : ''} flex flex-col`}
      style={{ minWidth: width }}
    >
      {children}
    </div>
  );
}

function RowSeparator({ draggable }: { draggable?: boolean }) {
  // return (
  //   <div className={`border-b-4 border-slate-300 ${draggable ? 'cursor-row-resize' : ''}`} />
  // );
  const dragCls = draggable ? 'cursor-row-resize' : '';
  return (
    <div
      className={`bg-slate-300 flex justify-center items-center ${dragCls}`}
      style={{ minWidth: 5, minHeight: 5 }}
    >
      {draggable && <div className="bg-white rounded" style={{ width: 20, height: 3}} />}
    </div>
  );
}

function ColSeparator({ draggable }: { draggable?: boolean }) {
  // return (
  //   <div className={`border-r-4 border-slate-300 ${draggable ? 'cursor-col-resize' : ''}`} />
  // );
  const dragCls = draggable ? 'cursor-col-resize' : '';
  return (
    <div
      className={`bg-slate-300 flex justify-center items-center ${dragCls}`}
      style={{ minWidth: 5, minHeight: 5 }}
    >
      {draggable && <div className="bg-white rounded" style={{ width: 3, height: 20}} />}
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
      <div className="h-full flex flex-col bg-white">
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
              {Array.from({ length: 20 }).map((_, index) => (
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
