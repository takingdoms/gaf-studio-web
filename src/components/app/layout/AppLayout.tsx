import Body from "../../ui/layout/Body";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <Body>
      {children}
    </Body>
  );
}
