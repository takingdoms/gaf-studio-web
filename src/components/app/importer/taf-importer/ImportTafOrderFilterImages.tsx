import ImageRenderer from '@/components/app/image-renderer/ImageRenderer';
import ImportBackground from '@/components/app/importer/common/ImportBackground';
import ImportContent from '@/components/app/importer/common/ImportContent';
import ImportFileList, { FileListItem } from '@/components/app/importer/common/ImportFileList';
import ImportPreviewWrapper from '@/components/app/importer/common/ImportPreviewWrapper';
import { TafImporting } from '@/components/app/importer/taf-importer/taf-importing-types';
import SolidButton from '@/components/ui/button/SolidButton';
import { MiscUtils } from '@/lib/utils/misc-utils';
import React from 'react';

type ImportTafOrderFilterImagesProps = {
  decodedFiles: TafImporting.DecodedFile[];
  onNext: (result: TafImporting.DecodedFileOk[]) => void;
  onAbort: () => void;
};

export default function ImportTafOrderFilterImages({
  decodedFiles,
  onNext,
  onAbort,
}: ImportTafOrderFilterImagesProps) {
  if (decodedFiles.length === 0) {
    throw new Error(`No files.`);
  }

  const [items, setItems] = React.useState<FileListItem<TafImporting.DecodedFile>[]>(
    decodedFiles.map((decFile) => {
      const error: string | undefined = decFile.result.kind === 'err'
        ? decFile.result.error
        : undefined;

      return {
        content: decFile,
        fileName: decFile.file.name,
        disabled: error !== undefined,
        error,
      };
    })
  );

  const [selectedIndex, setSelectedIndex] = React.useState<number>();

  const onClickFinish = React.useCallback(() => {
    const result = items
      .filter((item) => !item.disabled)
      .map(({ content }) => {
        if (content.result.kind === 'err') {
          return undefined;
        }

        return {
          file: content.file,
          result: content.result.result,
        };
      })
      .filter(MiscUtils.notUndefined);

    onNext(result);
  }, [items, onNext]);

  const noFileEnabled = items.every((item) => item.disabled);
  const selectedItem = selectedIndex !== undefined ? items[selectedIndex] : undefined;

  return (
    <ImportBackground>
      <ImportContent>
        <div className="flex space-x-4 mb-4">
          <div className="flex-1 overflow-hidden">
            <div className="text-center text-xs font-bold text-slate-500 mb-0.5">
              Reorder Files ({items.length})
            </div>

            <ImportFileList
              items={items}
              setItems={setItems}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="text-xs font-bold text-slate-500 mb-0.5">
              Image Preview
            </div>

            <SelectedItemPreview selectedItem={selectedItem} />
          </div>
        </div>
      </ImportContent>

      <div className="flex justify-between">
        <SolidButton
          color="default"
          onClick={onAbort}
        >
          Exit
        </SolidButton>

        <SolidButton
          color="success"
          onClick={onClickFinish}
          disabled={noFileEnabled}
        >
          Import
        </SolidButton>
      </div>
    </ImportBackground>
  );
}

function SelectedItemPreview({
  selectedItem,
}: {
  selectedItem: FileListItem<TafImporting.DecodedFile> | undefined;
}) {
  if (selectedItem === undefined) {
    return (
      <div className="flex justify-center items-center text-gray-400 text-center p-2">
        {'(No file selected)'}
      </div>
    );
  }

  const decFile = selectedItem.content.result;

  if (decFile.kind === 'err') {
    return (
      <button
        className="flex justify-center items-center text-red-600 text-center p-2 hover:underline"
        onClick={() => {
          console.log(decFile.error);
          alert(decFile.error);
        }}
      >
        {`(Couldn't decode file)`}
      </button>
    );
  }

  const preview = (
    <ImportPreviewWrapper
      imageData={decFile.result.image}
      imageWidth={decFile.result.metadata.width}
      imageHeight={decFile.result.metadata.height}
    />
  );

  if (!selectedItem.disabled) {
    return preview;
  }

  return (
    <div className="relative">
      <div style={{ opacity: '30%' }}>
        {preview}
      </div>
      <div className="absolute inset-0 flex justify-center items-center text-center">
        <span className="text-gray-500 font-bold">(Disabled)</span>
      </div>
    </div>
  );
}
