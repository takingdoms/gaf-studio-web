import config from "@/config";
import { ImageCompiler } from "@/lib/image/compiler/image-compiler";
import { SimpleImageCompiler } from "@/lib/image/compiler/simple-image-compiler";
import { Palette } from "@/lib/image/palette/palette";
import { PaletteUtils } from "@/lib/image/palette/palette-utils";
import { CurrentPalette, CurrentPaletteFromRaw } from "@/lib/state/gaf-studio/current-palette";
import { PaletteStore, PaletteStorePreSelectable } from "@/lib/state/gaf-studio/palette-store";

const PRE_SELECTABLE_FILES_BASE_PATH = config.baseUrl + '/palettes/';
const PRE_SELECTABLE_FILES: PaletteStorePreSelectable[] = [
  { key: 'ara_textures.pcx',    label: 'Aramon Units' },
  { key: 'aramon_features.pcx', label: 'Aramon Features' },
  { key: 'tar_textures.pcx',    label: 'Taros Units' },
  { key: 'taros_features.pcx',  label: 'Taros Features' },
  { key: 'ver_textures.pcx',    label: 'Veruna Units' },
  { key: 'veruna_features.pcx', label: 'Veruna Features' },
  { key: 'zhon_features.pcx',   label: 'Zhon Units' },
  { key: 'zon_textures.pcx',    label: 'Zhon Features' },
  { key: 'cre_textures.pcx',    label: 'Creon Units' },
  { key: 'creon_features.pcx',  label: 'Creon Features' },
] as const;

const KEY_BLACK_TO_WHITE = 'black-to-white';
const KEY_WHITE_TO_BLACK = 'white-to-black';

const PRE_SELECTABLE_RAWS: PaletteStorePreSelectable[] = [
  { key: KEY_BLACK_TO_WHITE, label: '(Black-to-white)' },
  { key: KEY_WHITE_TO_BLACK, label: '(White-to-black)' },
] as const;

export function createTakPaletteStore(): PaletteStore {
  const simpleImageCompiler = new SimpleImageCompiler();

  const blackToWhitePalette = makeGrayscalePalette(false);
  const whiteToBlackPalette = makeGrayscalePalette(true);

  const rawBlackToWhite = makeRawPalette(
    'Black-to-white',
    blackToWhitePalette,
    simpleImageCompiler,
  );

  const rawWhiteToBlack = makeRawPalette(
    'White-to-black',
    whiteToBlackPalette,
    simpleImageCompiler,
  );

  async function loadPreSelectable(key: string): Promise<CurrentPalette> {
    if (key === KEY_BLACK_TO_WHITE) return rawBlackToWhite;
    if (key === KEY_WHITE_TO_BLACK) return rawWhiteToBlack;

    const preSelectable = PRE_SELECTABLE_FILES.find((next) => next.key === key);

    if (preSelectable === undefined) {
      throw new Error(`Unknown pre-selectable palette key: ${key}`);
    }

    const url = PRE_SELECTABLE_FILES_BASE_PATH + preSelectable.key;
    const arrayBuffer = await fetch(url).then((data) => data.arrayBuffer());
    const bytes = new Uint8Array(arrayBuffer);
    const palette = PaletteUtils.loadFromPcxFileData(bytes);
    const previewImage = PaletteUtils.compilePreviewImage(palette);

    return {
      kind: 'world',
      fileName: key,
      palette,
      previewImage,
      world: preSelectable.label,
    };
  }

  const allPreSelectables: PaletteStorePreSelectable[] = [
    ...PRE_SELECTABLE_RAWS,
    ...PRE_SELECTABLE_FILES,
  ];

  return {
    default: rawBlackToWhite,
    preSelectables: allPreSelectables,
    loadPreSelectable,
  };
}

function makeGrayscalePalette(reverse: boolean): Palette {
  const rgbData = new Uint8Array(256 * 3);

  for (let i = 0; i < 256; i++) {
    const value = reverse
      ? 255 - i
      : i;

    rgbData[i * 3 + 0] = value;
    rgbData[i * 3 + 1] = value;
    rgbData[i * 3 + 2] = value;
  }

  return { rgbData };
}

function makeRawPalette(
  name: string,
  palette: Palette,
  imageCompiler: ImageCompiler,
): CurrentPaletteFromRaw {
  return {
    kind: 'raw',
    palette,
    previewImage: PaletteUtils.compilePreviewImage(palette, imageCompiler),
    customName: name,
  };
}
