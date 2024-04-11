import version from '@/version';

export default function PreludeLogo() {
  return (
    <div className="flex flex-col p-4">
      <div className="text-6xl text-slate-400 mb-1">
        Gaf Studio Web
      </div>
      <div className="text-right text-xs text-slate-400 font-bold">
        v{version}
      </div>
    </div>
  );
}
