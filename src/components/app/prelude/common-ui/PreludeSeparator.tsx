export default function PreludeSeparator() {
  return (
    <div className="flex justify-center m-6 relative">
      <div className="border-r border-dotted border-slate-500" />

      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <span
          className="bg-gray-300 text-slate-400 leading-none font-semibold pt-1 pb-1.5
            select-none"
        >
          OR
        </span>
      </div>
    </div>
  );
}
