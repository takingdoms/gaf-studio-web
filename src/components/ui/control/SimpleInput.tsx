type SimpleInputProps = {
  inputRef?: React.RefObject<HTMLInputElement>;
  type: 'text' | 'number';
  defaultValue?: string | number;
};

export default function SimpleInput({
  inputRef,
  type,
  defaultValue,
}: SimpleInputProps) {
  const fontCls = type === 'number' ? 'font-mono' : '';

  return (
    <input
      ref={inputRef}
      className={`${fontCls} border border-gray-300 px-0.5 py-0`}
      type={type}
      defaultValue={defaultValue}
    />
  );
}
