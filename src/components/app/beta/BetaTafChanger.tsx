import { TafWorkspaceStore } from '@/lib/state/store/workspace-store-wrapper-context';
import { useShallow } from 'zustand/react/shallow';

type BetaTafChangerProps = {
  useTafStore: TafWorkspaceStore;
};

export default function BetaTafChanger({ useTafStore }: BetaTafChangerProps) {
  console.log('Rendering BetaTafChanger');

  /*const { colorData, addColorData} = useTafStore(
    useShallow((state) => ({
      colorData: state.colorData,
      addColorData: state.addColorData,
    }))
  );*/

  const addColorData = useTafStore((state) => state.addColorData);

  return (
    <div>
      <button onClick={() => {
        addColorData([
          Math.round(Math.random() * 255),
        ]);
      }}>
        Add color data
      </button>
    </div>
  );
}
