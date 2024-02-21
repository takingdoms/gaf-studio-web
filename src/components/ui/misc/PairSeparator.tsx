import React from 'react';

type PairSeparatorProps = {
  dir: 'H' | 'V';
  resizable?: boolean;
  handleRef?: React.RefObject<HTMLDivElement>;
};

const SEP_WIDTH = 7;
const SEP_INNER_WIDTH = 3;
const SEP_INNER_LENGTH = 20;

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
      style={{ minWidth: SEP_WIDTH, minHeight: SEP_WIDTH }}
    >
      {resizable && (
        <div
          className="bg-white rounded-sm"
          style={{
            width: dir === 'H' ? SEP_INNER_WIDTH : SEP_INNER_LENGTH,
            height: dir === 'H' ? SEP_INNER_LENGTH : SEP_INNER_WIDTH,
          }}
        />
      )}
    </div>
  );
}
