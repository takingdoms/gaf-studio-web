import AppSubBar from "@/components/app/layout/sub-bar/AppSubBar";
import Body from "../../ui/layout/Body";
import AppTopBar from "./AppTopBar";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <Body>
      <div
        className="grow flex flex-col justify-start items-stretch overflow-hidden"
      >
        <div>
          <AppTopBar />
          <div className="border-b border-slate-300" />
          <AppSubBar />
          <div className="border-b border-slate-400" />
        </div>
        <div className="grow overflow-hidden bg-window-panel">
          {children}
        </div>
      </div>
    </Body>
  );
}
