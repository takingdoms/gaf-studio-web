import { TafWorkspaceStore } from '@/lib/state/store/workspace-store-wrapper-context';

type BetaTafViewerProps = {
  useTafStore: TafWorkspaceStore;
};

export default function BetaTafViewer({ useTafStore }: BetaTafViewerProps) {
  console.log('Rendering BetaTafViewer');

  const colorData = useTafStore((state) => state.colorData);

  return (
    <div>
      <b>Current colorData:</b>
      {colorData.map((color, index) => (
        <span key={index} className="ml-1">
          {color},
        </span>
      ))}
    </div>
  );
}
