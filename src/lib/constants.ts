// TODO eventually move these into a global ConfigContext
export const SHOW_MULTI_LAYER_FRAME_DATA_CONTROLS: boolean = false;

export const SEPARATOR_WIDTH = 7;
export const SEPARATOR_INNER_WIDTH = 3;
export const SEPARATOR_INNER_LENGTH = 20;

export const FRAME_SELECTOR_ITEM_HEIGHT = 132;
export const FRAME_SELECTOR_ITEM_WIDTH = FRAME_SELECTOR_ITEM_HEIGHT;

export type PalettePreviewMode = 'square' | 'stripe';
export const PALETTE_PREVIEW_MODE: PalettePreviewMode = 'stripe' as PalettePreviewMode;
export const PALETTE_PREVIEW_WIDTH = PALETTE_PREVIEW_MODE === 'square' ? 16 : 256;
export const PALETTE_PREVIEW_HEIGHT = PALETTE_PREVIEW_MODE === 'square' ? 16 : 1;

if (PALETTE_PREVIEW_WIDTH * PALETTE_PREVIEW_HEIGHT !== 256) {
  throw new Error(`Palette preview should have 256 pixels.`);
}
