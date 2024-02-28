import { SEPARATOR_WIDTH, SEPARATOR_INNER_WIDTH, SEPARATOR_INNER_LENGTH } from '@/lib/constants';
import React from 'react';

type PairSeparatorProps = {
  dir: 'H' | 'V';
  resizable?: boolean;
  handleRef?: React.RefObject<HTMLDivElement>;
};

export default function PairSeparator({
  dir,
  resizable,
  handleRef,
}: PairSeparatorProps) {
  const cls = resizable
    ? `hover:bg-slate-400 ${dir === 'H' ? 'cursor-col-resize' : 'cursor-row-resize'}`
    : '';

  return (
    <div
      ref={handleRef}
      className={`${cls} flex justify-center items-center bg-slate-300`}
      style={{ minWidth: SEPARATOR_WIDTH, minHeight: SEPARATOR_WIDTH }}
    >
      {resizable && (
        <div
          className="bg-white rounded-sm"
          style={{
            width: dir === 'H' ? SEPARATOR_INNER_WIDTH : SEPARATOR_INNER_LENGTH,
            height: dir === 'H' ? SEPARATOR_INNER_LENGTH : SEPARATOR_INNER_WIDTH,
          }}
        />
      )}
    </div>
  );
}
