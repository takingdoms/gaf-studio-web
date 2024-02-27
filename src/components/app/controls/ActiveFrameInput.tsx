type ActiveFrameInputProps = {
  activeFrameIndex: number | null;
  setActiveFrameIndex: (index: number | null) => void;
  minFrameIndex: number;
  maxFrameIndex: number;
};

export default function ActiveFrameInput({
  activeFrameIndex,
  setActiveFrameIndex,
  minFrameIndex,
  maxFrameIndex,
}: ActiveFrameInputProps) {
  console.log(activeFrameIndex);

  return (
    <input
      type="number"
      style={{ width: 60 }}
      className="border border-gray-300 pl-0.5"
      min={minFrameIndex + 1} // converts from 0-index to 1-index
      max={maxFrameIndex + 1} // converts from 0-index to 1-index
      value={
        activeFrameIndex !== null
          ? (activeFrameIndex + 1) // converts from 0-index to 1-index
          : ''
      }
      onChange={(ev) => {
        let value = parseInt(ev.target.value);

        if (Number.isNaN(value)) {
          setActiveFrameIndex(null);
          return;
        }

        value = Math.min(value, maxFrameIndex);
        value = Math.max(value, minFrameIndex);
        setActiveFrameIndex(value - 1); // converts from 1-index to 0-index
      }}
    />
  );
}
