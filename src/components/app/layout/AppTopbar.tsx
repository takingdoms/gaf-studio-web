import AppTopbarHeader from "./AppTopbarHeader";
import AppTopbarMenuButton from "./AppTopbarMenuButton";

export default function AppTopbar() {
  return (
    <div
      className="flex items-stretch w-full overflow-x-auto overflow-y-hidden bg-slate-100 p-0.5"
    >
      <AppTopbarMenuButton label="File" />
      <AppTopbarMenuButton label="Options" />
      <AppTopbarMenuButton label="Help" />
      <div className="grow flex justify-end">
        <AppTopbarHeader label="GAF Studio v0.0.0" />
      </div>
    </div>
  );
}
