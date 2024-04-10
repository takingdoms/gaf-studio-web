import ExportNodePath from '@/components/app/exporter/common/ExportNodePath';
import ExportNonFatalErrors from '@/components/app/exporter/common/ExportNonFatalErrors';
import SolidButton from '@/components/ui/button/SolidButton';
import { ValidatorFatalError } from '@/lib/exporting/validator/build-validator';
import { Icons } from '@/lib/react/icons';
import React from 'react';

type ExportResultFatalErrorProps = {
  error: ValidatorFatalError;
  onAbort: () => void;
};

export default function ExportResultFatalError({ error, onAbort }: ExportResultFatalErrorProps) {
  return (
    <div className="flex flex-col space-y-4">
      <div>
        <div className="text-center font-semibold mb-1">
          A fatal error has occurred.
        </div>

        <div className="text-center text-sm text-slate-500 font-semibold">
          You cannot export the result file when a fatal error occurs.
          <br />
          Please fix the problems and try to export again.
        </div>
      </div>


      <div className="px-4 py-2 bg-red-50 border border-red-100 rounded">
        <div className="flex items-center text-red-700 font-bold mb-0.5">
          <Icons.Error
            className="mr-1.5"
            size={24}
          />
          Fatal error:
        </div>
        <div>
          <span className="text-slate-700 font-semibold">Message:{' '}</span>
          <span className="text-slate-700">{error.message}</span>
        </div>
        {error.path !== undefined && (
          <div className="flex items-center mt-1">
            <div className="mr-2 text-base font-semibold">Location:</div>
            <ExportNodePath path={error.path} />
          </div>
        )}
      </div>

      {error.nonFatalErrors.length > 0 && <ExportNonFatalErrors errors={error.nonFatalErrors} />}

      <div className="flex justify-center space-x-2">
        <SolidButton
          color="default"
          onClick={onAbort}
        >
          Close
        </SolidButton>
      </div>
    </div>
  );
}
