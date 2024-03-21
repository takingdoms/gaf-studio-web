import ImportHeader from '@/components/app/importer/common/ImportHeader';
import ImportGafPaletteControls from '@/components/app/importer/gaf-importer/options-selector/ImportGafPaletteControls';
import TextButton from '@/components/ui/button/TextButton';
import { CurrentPalette } from '@/lib/state/gaf-studio/current-palette';
import { useGlobalConfigStore } from '@/lib/state/global-config/global-config-store';

type ImportGafWorkspaceOptionsProps = {
  currentPalette: CurrentPalette;
  setCurrentPalette: (newPal: CurrentPalette) => void;
};

export default function ImportGafWorkspaceOptions({
  currentPalette,
  setCurrentPalette,
}: ImportGafWorkspaceOptionsProps) {
  const collapsed = useGlobalConfigStore((state) => state.importerWorkspaceOptionsCollapsed);
  const setCollapsed = useGlobalConfigStore((state) => state.actions.setImporterWorkspaceOptionsCollapsed);

  return (
    <div>
      <ImportHeader>
        Workspace Options
        <span className="ml-1 font-normal">
          <TextButton
            label={collapsed ? 'Expand' : 'Collapse'}
            onClick={() => setCollapsed(!collapsed)}
          />
        </span>
      </ImportHeader>
      {!collapsed && (
        <ImportGafPaletteControls
          currentPalette={currentPalette}
          setCurrentPalette={setCurrentPalette}
        />
      )}
    </div>
  );
}
