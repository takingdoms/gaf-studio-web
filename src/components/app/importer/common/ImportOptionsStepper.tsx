import SolidButton from '@/components/ui/button/SolidButton';
import { Icons } from '@/lib/react/icons';
import React from 'react';

type ImportOptionsStepperProps = {
  total: number;
  current: number;
  onPrev: () => void;
  onNext: () => void;
  onNextAll?: () => void;
};

export default function ImportOptionsStepper({
  total,
  current,
  onPrev,
  onNext,
  onNextAll,
}: ImportOptionsStepperProps) {
  const isFirst = current === 0;
  const isLast = current === total - 1;

  return (
    <div className="flex flex-col">
      {onNextAll !== undefined && total > 1 && (
        <div className={`flex justify-end mb-1.5 ${isLast ? 'invisible' : ''}`}>
          <SolidButton
            color="success"
            onClick={onNextAll}
          >
            <span className="text-xs">Apply to all remaining&nbsp;</span>
            <Icons.NextAll size={16} />
          </SolidButton>
        </div>
      )}

      <div className="flex justify-between">
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
          color="success"
          onClick={onNext}
        >
          <span className="text-sm">{isLast ? 'Finish' : 'Next'}&nbsp;</span>
          <Icons.Next size={18} />
        </SolidButton>
      </div>
    </div>
  );
}
