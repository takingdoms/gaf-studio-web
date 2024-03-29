import React from 'react';

type LoadingOverlayProps = {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean | string;
  hideLabel?: boolean;
  overlayBg?: string;
};

export default function LoadingOverlay({
  children,
  className,
  isLoading,
  hideLabel,
  overlayBg
}: LoadingOverlayProps) {
  overlayBg ??= 'bg-[#0000001A]';
  isLoading ??= false;

  const handleClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    ev.stopPropagation();
    ev.nativeEvent.stopImmediatePropagation();
  };

  return (
    <div
      className={`relative ${className}`}
      onClick={isLoading === false ? undefined : handleClick}
    >
      {children}

      {isLoading !== false && (
        <div className={`${overlayBg} absolute inset-0 flex justify-center items-center`}>
          {!hideLabel && (
            <span className="text-white font-bold text-lg select-none">
              {isLoading === true ? 'Loading...' : isLoading}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
