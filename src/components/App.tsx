import AppLayout from "./app/layout/AppLayout";

export default function App() {
  return (
    <AppLayout>
      <div className="m-4">
        Check this out:
        <div
          className="border border-gray-400"
          style={{ width: 48, height: 48, background: 'white' }}
        />
      </div>
    </AppLayout>
  );
}
