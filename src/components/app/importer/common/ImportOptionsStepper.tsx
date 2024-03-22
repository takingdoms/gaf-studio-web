import SolidButton from '@/components/ui/button/SolidButton';
import { Icons } from '@/lib/react/icons';
import React from 'react';

type ImportOptionsStepperProps = {
  total: number;
  current: number;
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
};

export default function ImportOptionsStepper({
  total,
  current,
  onPrev,
  onNext,
  onFinish,
}: ImportOptionsStepperProps) {
  const isFirst = current === 0;
  const isLast = current === total - 1;

  return (
    <div className="flex flex-col">
      {total > 1 && (
        <div className="flex justify-between mb-2">
          <SolidButton
            color="default"
            onClick={onPrev}
            disabled={isFirst}
          >
            <Icons.Prev size={18} />
            <span className="text-sm">&nbsp;Prev</span>
          </SolidButton>

          <div className="self-center">
            {/* File{' '} */}
            <span className="font-mono">{current + 1}/{total}</span>
          </div>

          <SolidButton
            color="default"
            onClick={onNext}
            disabled={isLast}
          >
            <span className="text-sm">Next&nbsp;</span>
            <Icons.Next size={18} />
          </SolidButton>
        </div>
      )}

      <div className="flex justify-end">
        <SolidButton
          color="success"
          onClick={onFinish}
        >
          <span className="text-sm">Finish&nbsp;</span>
          <Icons.NextAll size={18} />
        </SolidButton>
      </div>
    </div>
  );
}
