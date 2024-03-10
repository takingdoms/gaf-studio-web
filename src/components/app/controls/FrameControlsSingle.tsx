import FrameDataControls from '@/components/app/controls/FrameDataControls';
import { S } from '@/lib/state/store/store-helper';

export default function FrameControlsSingle() {
  // console.log('Rendering FrameControlsSingle');

  const format = S.useFormat();
  const activeFrameFrameDataProps = S.useActiveFrameFrameDataProps();
  const modifyActiveFrameData = S.useStore()((state) => state.modifyActiveFrameData);

  if (activeFrameFrameDataProps === null) {
    throw new Error(`Can't use this component when there's no active frame.`);
  }

  return (
    <FrameDataControls
      frameData={activeFrameFrameDataProps}
      isSubframe={false}
      isGaf={format === 'gaf'}
      modify={modifyActiveFrameData}
    />
  );
}
