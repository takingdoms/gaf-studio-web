// TODO eventually move these into a global ConfigContext
export const SHOW_MULTI_LAYER_FRAME_DATA_CONTROLS: boolean = false;

export const SEPARATOR_WIDTH = 7;
export const SEPARATOR_INNER_WIDTH = 3;
export const SEPARATOR_INNER_LENGTH = 20;

export const FRAME_SELECTOR_ITEM_HEIGHT = 132;
export const FRAME_SELECTOR_ITEM_WIDTH = FRAME_SELECTOR_ITEM_HEIGHT;

export const PREVIEW_IMAGE_WIDTH = 256;
export const PREVIEW_IMAGE_HEIGHT = 1;

if (PREVIEW_IMAGE_WIDTH * PREVIEW_IMAGE_HEIGHT !== 256) {
  throw new Error(`Palette preview should have 256 pixels.`);
}
