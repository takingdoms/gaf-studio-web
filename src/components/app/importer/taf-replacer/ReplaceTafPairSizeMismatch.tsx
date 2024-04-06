import SolidButton from '@/components/ui/button/SolidButton';
import { VirtualFrameDataSingleLayer } from '@/lib/virtual-gaf/virtual-gaf';
import React from 'react';

type ReplaceTafPairSizeMismatchProps = {
  frameData: VirtualFrameDataSingleLayer<'taf-pair'>;
  dimensionMismatch: { width: number; height: number };
  onNext: () => void;
};

const cellCls = 'px-2 py-1 border border-gray-600';
const tdCls = cellCls;
const thCls = cellCls;

export default function ReplaceTafPairSizeMismatch({
  frameData,
  dimensionMismatch,
  onNext,
}: ReplaceTafPairSizeMismatchProps) {
  return (
    <div className="p-4">
      <div className="text-center font-semibold mb-2">
        Failed to replace image.
      </div>
      <div className="mb-4" style={{ maxWidth: 600 }}>
        When replacing the image data of an individual subformat (1555 or 4444), the dimensions{' '}
        of the new image must match the dimensions of the old image.
      </div>
      <div className="flex flex-col items-center mb-4">
        <table>
          <thead>
            <tr>
              <th></th>
              <th className={thCls}>Width</th>
              <th className={thCls}>Height</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className={thCls}>Old</th>
              <td className={tdCls}>{frameData.width}</td>
              <td className={tdCls}>{frameData.height}</td>
            </tr>
            <tr>
              <th className={thCls}>New</th>
              <td className={tdCls}>{dimensionMismatch.width}</td>
              <td className={tdCls}>{dimensionMismatch.height}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-center">
        <SolidButton onClick={onNext}>
          Close
        </SolidButton>
      </div>
    </div>
  );
}
