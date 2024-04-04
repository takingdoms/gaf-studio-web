import ImageRenderer from '@/components/app/image-renderer/ImageRenderer';
import React from 'react';

type ImportPreviewWrapperProps = {
  imageData: ImageData;
  imageWidth: number;
  imageHeight: number;
  wrapperWidth?: number;
  wrapperHeight?: number;
};

export default function ImportPreviewWrapper({
  imageData,
  imageWidth,
  imageHeight,
  wrapperWidth,
  wrapperHeight,
}: ImportPreviewWrapperProps) {
  wrapperWidth ??= 250;
  wrapperHeight ??= 300;

  return (
    <div
      className="relative border border-slate-300"
      style={{
        width: wrapperWidth,
        height: wrapperHeight,
      }}
    >
      <div className="absolute inset-1 flex justify-center items-center overflow-hidden">
        <ImageRenderer
          image={imageData}
          width={imageWidth}
          height={imageHeight}
          contain={true}
          smoothing={false}
        />
      </div>
    </div>
  );
}
