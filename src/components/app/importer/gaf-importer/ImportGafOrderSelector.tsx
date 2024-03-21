import ImageRenderer from "@/components/app/image-renderer/ImageRenderer";
import ImportBackground from "@/components/app/importer/common/ImportBackground";
import ImportContent from "@/components/app/importer/common/ImportContent";
import ImportFileList, { FileListItem } from "@/components/app/importer/common/ImportFileList";
import ImportPreviewWrapper from "@/components/app/importer/common/ImportPreviewWrapper";
import { GafDecodedUserFile, GafDecodedUserFileOk, isDecodedUserFileOk } from "@/components/app/importer/gaf-importer/gaf-importing-types";
import SolidButton from "@/components/ui/button/SolidButton";
import React from "react";

type ImportGafOrderSelectorProps = {
  decodedUserFiles: GafDecodedUserFile[];
  onFinish: (decodedUserFiles: GafDecodedUserFileOk[]) => void;
  onAbort: () => void;
};

export default function ImportGafOrderSelector({
  decodedUserFiles,
  onFinish,
  onAbort,
}: ImportGafOrderSelectorProps) {
  if (decodedUserFiles.length === 0) {
    throw new Error(`No files.`);
  }

  const [items, setItems] = React.useState<FileListItem<GafDecodedUserFile>[]>(
    decodedUserFiles.map((decodedUserFile) => {
      const error: string | undefined = decodedUserFile.error;

      return {
        content: decodedUserFile,
        fileName: decodedUserFile.file.name,
        disabled: error !== undefined,
        error,
      };
    })
  );

  const [selectedIndex, setSelectedIndex] = React.useState<number>();

  const onClickFinish = React.useCallback(() => {
    const enabledItems = items.filter((item) => !item.disabled);

    const result = enabledItems
      .map((item) => item.content)
      .filter(isDecodedUserFileOk)
      .map(({ file, decodedUserImage, selectedImporter }) => {
        return { file, decodedUserImage, selectedImporter };
      });

    onFinish(result);
  }, [items, onFinish]);

  const selectedItem = selectedIndex !== undefined ? items[selectedIndex] : undefined;

  const noFileEnabled = items.every((item) => item.disabled);

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
          <div className="flex-1">
            <div className="text-center text-xs font-bold text-slate-500 mb-0.5">
              Image Preview
            </div>

            <ImportPreviewWrapper>
              <SelectedItemPreview selectedItem={selectedItem} />
            </ImportPreviewWrapper>
          </div>
        </div>
      </ImportContent>

      <div className="flex justify-between">
        <SolidButton
          color="default"
          onClick={onAbort}
        >
          Cancel
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
  selectedItem: FileListItem<GafDecodedUserFile> | undefined;
}) {
  if (selectedItem === undefined) {
    return (
      <div className="flex justify-center items-center text-gray-400 text-center p-2">
        {'(No file selected)'}
      </div>
    );
  }

  const decodedUserFile = selectedItem.content;

  if (!isDecodedUserFileOk(decodedUserFile)) {
    return (
      <button
        className="flex justify-center items-center text-red-600 text-center p-2 hover:underline"
        onClick={() => {
          console.log(decodedUserFile.error);
          alert(decodedUserFile.error);
        }}
      >
        {`(Couldn't decode file)`}
      </button>
    );
  }

  const renderer = (
    <ImageRenderer
      image={decodedUserFile.decodedUserImage.image}
      width={decodedUserFile.decodedUserImage.metadata.width}
      height={decodedUserFile.decodedUserImage.metadata.height}
      contain={true}
      smoothing={false}
    />
  );

  if (!selectedItem.disabled) {
    return renderer;
  }

  return (
    <div className="relative">
      <div style={{ opacity: '30%' }}>
        {renderer}
      </div>
      <div className="absolute inset-0 flex justify-center items-center text-center">
        <span className="text-gray-500 font-bold">(Disabled)</span>
      </div>
    </div>
  );
}
