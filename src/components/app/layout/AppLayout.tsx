import Body from "../../ui/layout/Body";
import AppIconbar from "./AppIconbar";
import AppTopbar from "./AppTopbar";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <Body>
      <div
        className="grow flex flex-col justify-start items-stretch overflow-hidden border
          border-slate-400"
      >
        <div>
          <AppTopbar />
          <div className="border-b border-slate-300" />
          <AppIconbar />
          <div className="border-b border-slate-400" />
        </div>
        <div className="grow overflow-auto bg-window-panel">
          {children}
        </div>
      </div>
    </Body>
  );
}
