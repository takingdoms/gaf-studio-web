import SolidButton from "@/components/ui/button/SolidButton";
import { S } from "@/lib/state/workspace/workspace-context/any-workspace-helper";

export default function DeleteSubframeModal({ close }: { close: () => void }) {
  const activeSubframe = S.useActiveSubframe();
  const doDelete = S.useDeleteActiveSubframe();

  if (activeSubframe === null) {
    return <div className="p-4">No subframe selected.</div>;
  }

  return (
    <div className="flex flex-col p-4">
      <div>Are you sure you want to delete this subframe?</div>

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
