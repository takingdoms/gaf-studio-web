type BodyProps = {
  children: React.ReactNode;
};

export default function Body({ children }: BodyProps) {
  return (
    <div
      className="w-screen h-screen overflow-hidden flex flex-col justify-start items-stretch
        bg-white text-slate-800"
    >
      {children}
    </div>
  );
}
