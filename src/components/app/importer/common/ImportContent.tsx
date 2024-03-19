import ImportHeader from '@/components/app/importer/common/ImportHeader';
import React from 'react';

type ImportContentProps = {
  children: React.ReactNode;
  header?: string;
};

export default function ImportContent({ children, header }: ImportContentProps) {
  return (
    <div className="flex flex-col bg-white px-4 py-2 shadow">
      {header && (
        <ImportHeader>{header}</ImportHeader>
      )}

      <div className="flex flex-col space-y-4 py-2">{children}</div>
    </div>
  );
}
