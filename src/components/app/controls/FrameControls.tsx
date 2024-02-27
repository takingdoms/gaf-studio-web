export default function FrameControls() {
  return (
    <div className="grow flex flex-col overflow-auto bg-white p-2">
      HEY
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index}>
          {index}
        </div>
      ))}
    </div>
  );
}
