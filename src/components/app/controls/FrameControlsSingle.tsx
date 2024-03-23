import FrameDataControls from '@/components/app/controls/FrameDataControls';
import { useGlobalConfigStore } from '@/lib/state/global-config/global-config-store';
import { S } from '@/lib/state/store/store-helper';

export default function FrameControlsSingle() {
  // console.log('Rendering FrameControlsSingle');

  const format = S.useFormat();
  const activeFrameFrameDataProps = S.useActiveFrameFrameDataProps();
  const modifyActiveFrameData = S.useStore()((state) => state.modifyActiveFrameData);

  const showFrameData = useGlobalConfigStore((state) => state.showMultiFrameFrameData);
  const setShowFrameData = useGlobalConfigStore((state) => state.actions.setShowMultiFrameFrameData);

  if (activeFrameFrameDataProps === null) {
    throw new Error(`Can't use this component when there's no active frame.`);
  }

  const kind = activeFrameFrameDataProps.kind;
  const collapsed = kind === 'single' ? undefined : !showFrameData;
  const onToggle = kind === 'single' ? undefined : () => setShowFrameData(!showFrameData);

  return (
    <FrameDataControls
      frameData={activeFrameFrameDataProps}
      isSubframe={false}
      isGaf={format === 'gaf'}
      modify={modifyActiveFrameData}
      collapsed={collapsed}
      onToggle={onToggle}
    />
  );
}
