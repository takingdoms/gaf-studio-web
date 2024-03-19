import { ColorRgb, ColorRgba } from '@/lib/utils/utility-types';
import React from 'react';

type ColorTileProps = {
  color: ColorRgb | ColorRgba;
  size?: number;
};

export default function ColorTile({ color, size }: ColorTileProps) {
  const { r, g, b } = color;
  const a = 'a' in color ? color.a : undefined;

  const normalAlpha = a !== undefined
    ? a / 255
    : undefined;

  const background = normalAlpha === undefined
    ? `rgb(${r},${g},${b})`
    : `rgba(${r},${g},${b},${normalAlpha})`;

  return (
    <div
      className="inline-block"
      style={{
        width: size ?? 32,
        height: size ?? 32,
        background,
      }}
    />
  );
}
