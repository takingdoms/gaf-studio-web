import AppSubBarIcons from "@/components/app/layout/AppSubBarIcons";
import AppSubBarStatus from "@/components/app/layout/AppSubBarStatus";

export default function AppSubBar() {
  return (
    <div
      className="flex w-full overflow-x-auto overflow-y-hidden bg-slate-200"
    >
      <div className="basis-1/3 flex pr-2 bg-red-500~">
        <AppSubBarIcons />
      </div>
      <Separator />
      <div className="basis-1/3 flex px-2 bg-green-500~">
        <AppSubBarStatus />
      </div>
      <Separator />
      <div className="shrink basis-1/3 flex pl-2 bg-blue-500~">
        <div />
      </div>
    </div>
  );
}

function Separator() {
  return (
    <div className="flex items-center basis-0">
      <div
        className="border-l border-slate-300"
        style={{ height: '75%' }}
      />
    </div>
  );
}
