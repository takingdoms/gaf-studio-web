import AppSubBarIcons from "@/components/app/layout/sub-bar/AppSubBarIcons";
import AppSubBarSeparator from "@/components/app/layout/sub-bar/AppSubBarSeparator";
import AppSubBarStatus from "@/components/app/layout/sub-bar/AppSubBarStatus";

export default function AppSubBar() {
  return (
    <div
      className="flex w-full overflow-x-auto overflow-y-hidden bg-slate-200"
    >
      <AppSubBarIcons />
      <AppSubBarSeparator />
      <AppSubBarStatus />
    </div>
  );
}
