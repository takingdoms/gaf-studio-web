import FlatButton from '@/components/ui/button/FlatButton';
import { ModalContext } from '@/components/ui/modal/ModalContext';
import ModalPadding from '@/components/ui/modal/ModalPadding';
import { Icons } from '@/lib/react/icons';
import Mime from 'mime';
import React from 'react';

export type FileListItem<T> = {
  content: T;
  fileName: string;
  disabled: boolean;
  error?: string;
};

type ImportFileListProps<T> = {
  items: FileListItem<T>[];
  setItems: (items: FileListItem<T>[]) => void;
  selectedIndex: number | undefined;
  setSelectedIndex: (sel: number | undefined) => void;
};

const tdCls = 'px-2 py-1 text-sm overflow-hidden';

export default function ImportFileList<T>({
  items,
  setItems,
  selectedIndex,
  setSelectedIndex,
}: ImportFileListProps<T>) {
  if (items.length === 0) {
    throw new Error(`No items.`);
  }

  const noSelection = selectedIndex === undefined;
  const isSelectedFirst = selectedIndex !== undefined && selectedIndex === 0;
  const isSelectedLast = selectedIndex !== undefined && selectedIndex === items.length - 1;
  const isSelectedDisabled = selectedIndex !== undefined && items[selectedIndex].disabled;

  const modal = React.useContext(ModalContext);

  const onMove = React.useCallback((dir: -1 | 1) => {
    if (selectedIndex === undefined) {
      return;
    }

    const newIndex = selectedIndex + dir;
    if (newIndex < 0 || newIndex >= items.length) {
      throw new Error(`Out of bounds`);
    }

    const newItems = [...items];
    [newItems[selectedIndex], newItems[newIndex]] = [newItems[newIndex], newItems[selectedIndex]];

    setItems(newItems);
    setSelectedIndex(newIndex);
  }, [selectedIndex, items, setItems, setSelectedIndex]);

  const onSetEnabled = React.useCallback((enabled: boolean) => {
    if (selectedIndex === undefined) {
      return;
    }

    const item: FileListItem<T> = {
      ...items[selectedIndex],
    };

    if (item.error !== undefined) {
      // TODO use the eventual AlertService here instead
      modal.pushModal({
        title: `This file is unsupported by the selected Image Importer`,
        body: (
          <ModalPadding>
            {item.error}
          </ModalPadding>
        ),
      });

      return;
    }

    const newItems = [...items];
    newItems[selectedIndex] = {
      ...item,
      disabled: !enabled,
    };

    setItems(newItems);
  }, [selectedIndex, items, setItems, modal]);

  return (
    <div className="flex flex-col">
      <div
        className="border border-slate-400 overflow-auto"
        style={{ height: 250 }}
      >
        <table>
          <tbody>
            {items.map((item, index) => {
              const isSelected = selectedIndex === index;
              const unsupported = item.error !== undefined;

              const bgCls
                = isSelected ? 'bg-sky-200'
                : !item.disabled ? 'group-hover:bg-sky-50'
                : '';

              const colorCls
                = item.disabled ? 'opacity-50 line-through'
                : unsupported ? 'text-red-600'
                : 'text-slate-600';

              const mimeType = Mime.getType(item.fileName);
              const ext = mimeType ? Mime.getExtension(mimeType) : null;

              return (
                <tr
                  key={index}
                  className="group cursor-pointer"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setSelectedIndex(index);
                  }}
                >
                  <td
                    className={`${tdCls} ${bgCls} ${colorCls} w-full font-medium`}
                    style={{ maxWidth: 1 }}
                  >
                    <div className="truncate">
                      {item.fileName}
                    </div>
                  </td>
                  <td className={`${tdCls} ${bgCls} ${colorCls} font-medium`}>
                    {ext?.toUpperCase() ?? '??'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center border border-t-0 border-slate-400">
        <div className="flex px-1 py-0.5 space-x-1">
          <FlatButton
            onClick={() => onMove(1)}
            disabled={noSelection || isSelectedLast}
            title="Move Down"
          >
            <Icons.CircleCaretDown />
          </FlatButton>

          <FlatButton
            onClick={() => onMove(-1)}
            disabled={noSelection || isSelectedFirst}
            title="Move Up"
          >
            <Icons.CircleCaretUp />
          </FlatButton>

          <FlatButton
            onClick={() => onSetEnabled(false)}
            disabled={noSelection || isSelectedDisabled}
            title="Disable"
          >
            <Icons.CircleX />
          </FlatButton>

          <FlatButton
            onClick={() => onSetEnabled(true)}
            disabled={noSelection || !isSelectedDisabled}
            title="Enable"
          >
            <Icons.CircleCheck />
          </FlatButton>
        </div>
      </div>
    </div>
  );
}
