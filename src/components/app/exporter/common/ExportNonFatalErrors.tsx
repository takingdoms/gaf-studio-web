import ExportNodePath from '@/components/app/exporter/common/ExportNodePath';
import { ValidatorError } from '@/lib/exporting/validator/build-validator';
import { Icons } from '@/lib/react/icons';
import React from 'react';

type ExportNonFatalErrorsProps = {
  errors: readonly ValidatorError[];
};

const SEVERITY_LABEL: Record<'low' | 'med' | 'high', string> = {
  'low': 'Low',
  'med': 'Medium',
  'high': 'High',
};

const SEVERITY_COLOR: Record<'low' | 'med' | 'high', string> = {
  'low': 'text-yellow-600',
  'med': 'text-orange-600',
  'high': 'text-red-600',
};

const thCls = 'px-1.5 py-1 text-left align-top';
const tdCls = 'px-1.5 py-2 align-top';

export default function ExportNonFatalErrors({ errors }: ExportNonFatalErrorsProps) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="px-4 py-2 bg-orange-50 border border-orange-100 rounded">
      <div className="flex items-center text-amber-700 font-bold mb-0.5">
        <Icons.Warning
          className="mr-1.5"
          size={24}
        />
        Warnings:
      </div>

      <table className="text-xs -mx-2" style={{ maxWidth: 600 }}>
        <thead>
          <tr>
            <th className={thCls}>Severity</th>
            <th className={thCls}>Message</th>
            <th className={thCls}>Location</th>
          </tr>
        </thead>
        <tbody>
          {errors.map((error, index) => {
            return (
              <tr key={index}>
                <td
                  className={tdCls}
                  style={{ width: '1%' }}
                >
                  <span className={`${SEVERITY_COLOR[error.severity]} font-semibold`}>
                    {SEVERITY_LABEL[error.severity]}
                  </span>
                </td>
                <td
                  className={tdCls}
                  style={{ width: '65%' }}
                >
                  {error.message}
                </td>
                <td
                  className={tdCls}
                  style={{ width: '35%' }}
                >
                  <ExportNodePath path={error.path} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
