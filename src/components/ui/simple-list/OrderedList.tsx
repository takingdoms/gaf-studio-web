export type OrderedListItem<T> = {
  key: T;
  label: string | React.ReactNode;
  title?: string;
};

type OrderedListProps<T> = {
  items: readonly OrderedListItem<T>[];
  selectedKey: T;
  onSelect?: (key: T) => void;
};

export default function OrderedList<T>({
  items,
  selectedKey,
  onSelect,
}: OrderedListProps<T>) {
  const cursorCls = onSelect ? 'cursor-pointer' : '';

  return (
    <div className="bg-white border border-slate-400">
      {items.map((item, index) => {
        const isSelected = item.key === selectedKey;
        const bgCls = isSelected ? 'bg-sky-200' : 'hover:bg-sky-50';

        return (
          <div
            key={index}
            className={`${bgCls} ${cursorCls} truncate text-sm px-2 py-1`}
            onClick={(ev) => {
              if (onSelect) {
                ev.preventDefault();
                onSelect(item.key);
              }
            }}
            title={item.title}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
}
