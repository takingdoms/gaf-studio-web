export type CanvasConfig = {
  readonly background: string;
  readonly showGridOnTop: boolean;
  readonly frameBoundary: 'below' | 'above' | null;
  readonly frameBoundaryBorderStyleSingle: string;
  readonly frameBoundaryBorderStyleMulti: string;
};
