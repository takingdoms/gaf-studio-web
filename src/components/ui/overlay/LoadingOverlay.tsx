import React from 'react';

type LoadingOverlayProps = {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean | string;
};

export default function LoadingOverlay({
  children,
  className,
  isLoading,
}: LoadingOverlayProps) {
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
        <div className="absolute inset-0 bg-[#0000001A] flex justify-center items-center">
          <span className="text-white font-bold text-lg select-none">
            {isLoading === true ? 'Loading...' : isLoading}
          </span>
        </div>
      )}
    </div>
  );
}
