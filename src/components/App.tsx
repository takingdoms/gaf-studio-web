import FileMapViewer from "@/components/app/file-map-viewer/FileMapViewer";
import AppLayout from "./app/layout/AppLayout";
import GafFileLoader from "@/components/app/file-map-viewer/GafFileLoader";

export default function App() {
  return (
    <AppLayout>
      <GafFileLoader>
        <FileMapViewer />
      </GafFileLoader>
    </AppLayout>
  );
}
