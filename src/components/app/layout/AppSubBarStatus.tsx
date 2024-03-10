import { S } from "@/lib/state/store/store-helper";

export default function AppSubBarStatus() {
  const currentGafFileName = S.useStore()((state) => {
    const currentGaf = state.getCurrentGaf();

    return currentGaf.kind === 'from-file'
      ? currentGaf.fileName
      : null;
  });

  return (
    <div className="flex items-center px-1 py-0.5">
      <div className="text-xs">
        <span className="text-slate-500 font-medium">Loaded from file:{' '}</span>
        {currentGafFileName === null ? (
          <span className="text-slate-400 italic">(None)</span>
        ) : (
          <span className="text-slate-500">{currentGafFileName}</span>
        )}
      </div>
    </div>
  );
}
