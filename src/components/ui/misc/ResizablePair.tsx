import PairSeparator from "@/components/ui/misc/PairSeparator";
import React from 'react';

type ResizablePairProps = {
  dir: 'H' | 'V';
  childA: React.ReactNode;
  childB: React.ReactNode;
  dominantChild: 'A' | 'B';
  subordinateChildMinSize?: number | string;
  subordinateChildMaxSize?: number | string;
};

export default function ResizablePair({
  dir,
  childA,
  childB,
  dominantChild,
  subordinateChildMinSize,
  subordinateChildMaxSize,
}: ResizablePairProps) {
  const subordinateChildRef = React.useRef<HTMLDivElement>(null);
  const handleRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const subordinateChild = subordinateChildRef.current;
    const handle = handleRef.current;

    if (subordinateChild === null || handle === null) {
      return;
    }

    let start: number | undefined = undefined;
    let initialSize: number | undefined = undefined;

    // console.log('Adding events');

    const onMouseDown = (ev: MouseEvent) => {
      ev.preventDefault();
      // console.log('mousedown');
      start = dir === 'H' ? ev.clientX : ev.clientY;
      initialSize = dir === 'H' ? subordinateChild.clientWidth : subordinateChild.clientHeight;
    };

    const onMouseMove = (ev: MouseEvent) => {
      // console.log('mousemove');
      if (start === undefined || initialSize === undefined) {
        return;
      }

      const subordinateIsLeft = dominantChild === 'B';
      const mult = subordinateIsLeft ? 1 : -1;

      if (dir === 'H') {
        const delta = ev.clientX - start;
        subordinateChild.style.width = (initialSize + delta * mult) + 'px';
      }
      else {
        const delta = ev.clientY - start;
        subordinateChild.style.height = (initialSize + delta * mult) + 'px';
      }

      // console.log('delta', delta);
    };

    const onMouseUp = () => {
      // console.log('mouseup');
      start = undefined;
    };

    handle.addEventListener('mousedown', onMouseDown);
    document.body.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseup', onMouseUp);
    window.addEventListener('blur', onMouseUp);

    return () => {
      // console.log('Removing events');

      handle.removeEventListener('mousedown', onMouseDown);
      document.body.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('blur', onMouseUp);
    };
  }, [dir, dominantChild]);

  const cls = dir === 'H'
    ? 'flex-row'
    : 'flex-col';

  return (
    <div className={`${cls} h-full flex overflow-hidden`}>
      {/* child A */}
      <div
        ref={dominantChild !== 'A' ? subordinateChildRef : undefined}
        className={`${dominantChild === 'A' ? 'grow' : ''} max-w-full flex flex-col overflow-hidden`}
        style={{
          minWidth:   dominantChild !== 'A' && dir === 'H' ? subordinateChildMinSize : undefined,
          minHeight:  dominantChild !== 'A' && dir === 'V' ? subordinateChildMinSize : undefined,
          maxWidth:   dominantChild !== 'A' && dir === 'H' ? subordinateChildMaxSize : undefined,
          maxHeight:  dominantChild !== 'A' && dir === 'V' ? subordinateChildMaxSize : undefined,
        }}
      >
        {childA}
      </div>

      <PairSeparator
        dir={dir}
        resizable
        handleRef={handleRef}
      />

      {/* child B */}
      <div
        ref={dominantChild !== 'B' ? subordinateChildRef : undefined}
        className={`${dominantChild === 'B' ? 'grow' : ''} max-w-full flex flex-col overflow-hidden`}
        style={{
          minWidth:   dominantChild !== 'B' && dir === 'H' ? subordinateChildMinSize : undefined,
          minHeight:  dominantChild !== 'B' && dir === 'V' ? subordinateChildMinSize : undefined,
          maxWidth:   dominantChild !== 'B' && dir === 'H' ? subordinateChildMaxSize : undefined,
          maxHeight:  dominantChild !== 'B' && dir === 'V' ? subordinateChildMaxSize : undefined,
        }}
      >
        {childB}
      </div>
    </div>
  );
}
