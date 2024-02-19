export type SelectOption<TId extends string = string> = {
  id: TId;
  label: string;
};

type SelectProps<TId extends string> = {
  name?: string;
  htmlId?: string;
  required?: boolean;
  disabled?: boolean;
  options: SelectOption<TId>[];
  // como o disabled (não permite alterar o valor), mas não remove o valor do formData.
  // não usar junto com o 'value'. use o 'defaultValue'!
  frozenValue?: TId;
  value?: TId;
  onChange?: (value: TId) => void;
  defaultValue?: string;
  className?: string;
};

export default function Select<TId extends string = string>({
  htmlId,
  name,
  options,
  required,
  disabled,
  frozenValue,
  value,
  onChange,
  defaultValue,
  className,
}: SelectProps<TId>) {
  if (frozenValue) {
    value = frozenValue;
    onChange = () => {};
    defaultValue = undefined;
  }

  const bgCss = !disabled && frozenValue === undefined
    ? 'bg-main-700'
    : 'bg-main-800';

    // TODO make it so the "default" selection is empty and not the first option

  return (
    <select
      className={`w-full px-2 py-1 border border-main-800 ${bgCss} ${className ?? ''}`}
      name={name}
      id={htmlId}
      required={required}
      disabled={disabled}
      value={value}
      onChange={onChange ? (ev) => onChange!(ev.target.value as TId) : undefined}
      defaultValue={defaultValue}
    >
      {options.map((option) => {
        return (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
}
