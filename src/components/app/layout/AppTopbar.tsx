import FrameMenu from "@/components/app/layout/top-bar-menus/FrameMenu";
import AppTopBarHeader from "./AppTopBarHeader";
import AppTopBarMenuButton from "./AppTopBarMenuButton";
import ToolsMenu from "@/components/app/layout/top-bar-menus/ToolsMenu";
import SubframeMenu from "@/components/app/layout/top-bar-menus/SubframeMenu";
import ViewMenu from "@/components/app/layout/top-bar-menus/ViewMenu";
import EntryMenu from "@/components/app/layout/top-bar-menus/EntryMenu";
import FileMenu from "@/components/app/layout/top-bar-menus/FileMenu";

export default function AppTopbar() {
  return (
    <div
      className="flex items-stretch w-full overflow-x-auto overflow-y-hidden bg-slate-100 p-0.5"
    >
      <FileMenu />

      {/* <AppTopBarMenuButton
        label="Options"
        onClick={() => {}}
      /> */}

      <EntryMenu />

      <FrameMenu />

      <SubframeMenu />

      <ViewMenu />

      <ToolsMenu />

      <AppTopBarMenuButton
        label="Help"
        onClick={() => {}}
      />

      <div className="grow flex justify-end">
        <AppTopBarHeader label="GAF Studio v0.0.0" />
      </div>
    </div>
  );
}
