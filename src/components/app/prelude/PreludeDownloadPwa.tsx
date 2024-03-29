import TextButton from "@/components/ui/button/TextButton";

export default function PreludeDownloadPwa() {
  return (
    <div className="text-xs">
      <TextButton
        label="Download for offline use"
        onClick={() => alert('Coming soon!')}
      />
    </div>
  );
}
