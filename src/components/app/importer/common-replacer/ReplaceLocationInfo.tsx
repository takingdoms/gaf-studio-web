import { Icons } from '@/lib/react/icons';

type ReplaceLocationInfoProps = {
  target: { entryIndex: number; frameIndex: number; subframeIndex?: number };
};

export default function ReplaceLocationInfo({ target }: ReplaceLocationInfoProps) {
  return (
    <div className="mb-4">
      <div className="mb-1">
        Replacing image data of {target.subframeIndex !== undefined ? 'subframe' : 'frame'} at position:
      </div>
      <div
        className="inline-flex items-center space-x-1.5 font-mono bg-slate-200 px-1.5 py-0.5
          rounded"
      >
        <span>Entry #{target.entryIndex + 1}</span>
        <span><Icons.ArrowRight size={14} /></span>
        <span>Frame #{target.frameIndex + 1}</span>
        {target.subframeIndex !== undefined && (<>
          <span><Icons.ArrowRight size={14} /></span>
          <span>Subframe #{target.subframeIndex + 1}</span>
        </>)}
      </div>
    </div>
  );
}
