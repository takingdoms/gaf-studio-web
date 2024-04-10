import { NodePath } from '@/lib/exporting/validator/build-validator';
import React from 'react';

type ExportNodePathProps = {
  path: readonly NodePath[];
};

export default function ExportNodePath({ path }: ExportNodePathProps) {
  return (
    <div className="flex flex-wrap items-start">
      {path.map(({ node, pos }, index) => {
        return (
          <React.Fragment key={index}>
            <div className="">
              {node}
              {pos !== undefined && (<>
                {' '}#{pos + 1}
              </>)}
            </div>
            {index < path.length - 1 && (
              <div className="mx-2">
                →
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
