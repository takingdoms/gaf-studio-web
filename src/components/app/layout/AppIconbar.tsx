import { Icons } from "@/lib/react/icons";
import AppIconbarButton from "./AppIconbarButton";

export default function AppIconbar() {
  return (
    <div
      className="flex items-stretch w-full overflow-x-auto overflow-y-hidden bg-slate-200 p-0.5"
    >
      <AppIconbarButton icon={Icons.NewFile} />
      <AppIconbarButton icon={Icons.OpenFile} />
      <AppIconbarButton icon={Icons.SaveFile} disabled />
    </div>
  );
}
