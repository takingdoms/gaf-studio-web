import IconButton from '@/components/ui/button/IconButton';
import TextButton from '@/components/ui/button/TextButton';
import { CurrentPalette } from '@/lib/gaf-studio/state/current-palette';
import { Icons } from '@/lib/react/icons';
import { DeepReadonly } from 'ts-essentials';

type WorkspaceInfoPaletteProps = {
  currentPalette: DeepReadonly<CurrentPalette> | null;
};

export default function WorkspaceInfoPalette({ currentPalette: pal }: WorkspaceInfoPaletteProps) {
  if (pal === null) {
    return (
      <div className="flex justify-center items-center space-x-2">
        <span className="text-gray-500">(None)</span>
        <TextButton
          label="Select palette"
          onClick={() => {}}
        />
      </div>
    );
  }

  let fileName: string | null;
  let label: string;

  if (pal.kind === 'raw') {
    fileName = null;
    label = 'Raw bytes';
  }
  else if (pal.kind === 'custom-file') {
    fileName = pal.originFile.name;
    label = 'Custom file';
  }
  else if (pal.kind === 'world') {
    // TODO load built-in palette for pal.world
    // pal.world is an "ID" of the built-in world palette
    const worldPalette = {
      fileName: 'ara_textures.pcx',
      label: 'Aramon Units',
    };

    fileName = worldPalette.fileName;
    label = worldPalette.label; // ex: "Aramon Units"; "Veruna Features"
  }
  else {
    throw new Error(`Unknown palette kind.`);
  }

  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="truncate">
        ({fileName})
      </div>
      <div className="truncate">
        ({label})
      </div>
      <div className="flex items-center">
        <IconButton
          icon={Icons.Options}
          onClick={() => {}}
        />
      </div>
    </div>
  );
}

//<span className="text-gray-500">(None)</span>
