import { Icons } from '@/lib/react/icons';

export type PreludeStepStatus = 'empty' | 'ok' | 'err';

type PreludeStepProps = {
  label: string;
  status: PreludeStepStatus;
};

export default function PreludeStep({ label, status }: PreludeStepProps) {
  const colorCls = status === 'ok' ? 'text-green-600'
    : status === 'err' ? 'text-red-600'
    : 'text-slate-400';

  const Icon = status === 'ok' ? Icons.CircleCheck
    : status === 'err' ? Icons.CircleX
    : Icons.CircleDot;

  return (
    <div className={`${colorCls} flex items-center font-semibold text-lg mb-2`}>
      <Icon className="mr-1.5" size={24} />
      <span>{label}</span>
    </div>
  );
}
