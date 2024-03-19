import ImportBackground from '@/components/app/importer/common/ImportBackground';
import ImportContent from '@/components/app/importer/common/ImportContent';
import ImportGafConversionStats from '@/components/app/importer/gaf-importer/options-selector/ImportGafConversionStats';
import FlatButton from '@/components/ui/button/FlatButton';
import { ModalContext } from '@/components/ui/modal/ModalContext';
import { ImporterResultWrapper } from '@/lib/importing/image-importer';
import { GafImporterResult } from '@/lib/importing/image-importers/gaf/gaf-image-importer';
import { IconFunc, Icons } from '@/lib/react/icons';
import React from 'react';

type ImportGafConversionMessageProps = {
  resultWrapper: ImporterResultWrapper<GafImporterResult>;
};

export default function ImportGafConversionMessage({
  resultWrapper,
}: ImportGafConversionMessageProps) {
  let title: string;
  let message: string;
  let colorCls: string;
  let Icon: IconFunc;
  let showMore: boolean;

  if (resultWrapper.kind === 'error') {
    title = 'Conversion error';
    message = resultWrapper.error;
    colorCls = 'text-red-600';
    Icon = Icons.PhotoError;
    showMore = false;
  }
  else if (resultWrapper.kind === 'warning') {
    title = 'Lossy conversion';
    message = resultWrapper.warning;
    colorCls = 'text-yellow-600';
    Icon = Icons.PhotoLossy;
    showMore = true;
  }
  else {
    title = 'Lossless conversion';
    message = `Every pixel of the source image matched with a color in the palette selected.`;
    colorCls = 'text-emerald-600';
    Icon = Icons.PhotoLossless;
    showMore = true;
  }

  const modal = React.useContext(ModalContext);

  const onClickShowMore = React.useCallback(() => {
    if (resultWrapper.kind === 'error') {
      return; // for type narrowing (can't reach here when it's of error kind anyways)
    }

    modal.pushModal({
      title: 'Conversion Stats',
      body: (
        <ImportBackground>
          <ImportContent>
            <ImportGafConversionStats resultWrapper={resultWrapper} />
          </ImportContent>
        </ImportBackground>
      ),
    });
  }, [resultWrapper, modal]);

  return (
    <div className={`${colorCls} flex flex-col bg-slate-100 rounded px-4 py-2`}>
      <div className="flex items-center">
        <Icon className="mr-2" size={22} />
        <span className="grow font-bold text-sm">{title}</span>
        {showMore && (
          <FlatButton onClick={onClickShowMore}>
            <div className="flex items-center text-xs">
              <span className="text-gray-400 font-bold">More</span>
            </div>
          </FlatButton>
        )}
      </div>
      <div
        className="text-xs"
        style={{ maxWidth: 250 * 2 - 50 }} // 250 = ImportPreviewWrapper.maxWidth
      >
        {message}
      </div>
    </div>
  );
}
