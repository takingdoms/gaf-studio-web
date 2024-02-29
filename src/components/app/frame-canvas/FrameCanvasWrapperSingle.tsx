import LibGaf from "lib-gaf";

type FrameCanvasWrapperSingleProps = {
  frameData: LibGaf.GafFrameDataSingleLayer;
};

export default function FrameCanvasWrapperSingle({ frameData }: FrameCanvasWrapperSingleProps) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-white">
      <div><b>Selected Frame (single):</b></div>
      <div>{frameData.width}</div>
    </div>
  );
}
