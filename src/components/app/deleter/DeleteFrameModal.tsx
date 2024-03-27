import SolidButton from "@/components/ui/button/SolidButton";
import { S } from "@/lib/state/workspace/workspace-context/any-workspace-helper";

export default function DeleteFrameModal({ close }: { close: () => void }) {
  const activeFrame = S.useActiveFrame();
  const doDelete = S.useDeleteActiveFrame();

  if (activeFrame === null) {
    return <div className="p-4">No frame selected.</div>;
  }

  return (
    <div className="flex flex-col p-4">
      <div>Are you sure you want to delete this frame?</div>

      {activeFrame.frameData.kind === 'multi' && (
        <div className="mt-1 text-sm font-bold text-slate-500">
          All of its subframes ({activeFrame.frameData.layers.length}) will also be deleted.
        </div>
      )}

      <div className="mt-4 flex justify-end space-x-2">
        <SolidButton
          color="danger"
          onClick={() => {
            doDelete();
            alert('Deleted.'); // TODO replace with a toaster
            close();
          }}
        >
          Delete
        </SolidButton>
        <SolidButton
          color="default"
          onClick={close}
        >
          Cancel
        </SolidButton>
      </div>
    </div>
  );
}
