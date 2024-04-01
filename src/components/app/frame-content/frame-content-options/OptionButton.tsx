import BgSelectorModalContent from '@/components/app/frame-content/frame-content-options/BgSelectorModalContent';
import { Menu, MenuItem, MenuItemCheckbox } from '@/components/ui/dropdown/DropdownMenu';
import { ModalContext } from '@/components/ui/modal/ModalContext';
import { Icons } from '@/lib/react/icons';
import { useCanvasConfigStore } from '@/lib/state/canvas/canvas-config-store';
import React from 'react';

export default function OptionButton() {
  console.log('Rendering OptionButton');

  const modal = React.useContext(ModalContext);

  const onClickChangeBg = React.useCallback(async () => {
    const { close } = modal.pushModal({
      title: 'Change Background',
      body: <BgSelectorModalContent close={() => close()} />,
    });
  }, [modal]);

  const layers = useCanvasConfigStore((state) => state.mainCanvasLayerVisibility);
  const setLayers = useCanvasConfigStore((state) => state.actions.setMainCanvasLayerVisibility);

  return (
    <Menu
      label="Options"
      icon={Icons.Options}
      className="inline-flex items-center bg-slate-400 text-slate-100 px-1.5 py-1
        rounded-tl rounded-tr hover:bg-slate-500 hover:text-white text-xs font-bold"
    >
      <MenuItem
        label="Change background"
        onClick={onClickChangeBg}
      />

      <MenuItemCheckbox
        label="Show grid"
        checked={layers['GRID']}
        onChange={(checked) => setLayers({ ...layers, 'GRID': checked })}
      />

      <MenuItemCheckbox
        label="Show crosshair"
        checked={layers['CROSS']}
        onChange={(checked) => setLayers({ ...layers, 'CROSS': checked })}
      />

      <MenuItemCheckbox
        label="Show offset bounds"
        checked={layers['BOUNDS']}
        onChange={(checked) => setLayers({ ...layers, 'BOUNDS': checked })}
      />

      <MenuItemCheckbox
        label="Show origin bounds"
        checked={layers['O_BOUNDS']}
        onChange={(checked) => setLayers({ ...layers, 'O_BOUNDS': checked })}
      />
    </Menu>
  );
}
