type LayerViewerProps = {
  todo: 'TODO';
};

export default function LayerViewer({ todo }: LayerViewerProps) {
  return (
    <div className="grow flex flex-col justify-center items-center bg-white">
      <div><b>Selected Frame:</b></div>
      <div>{todo}</div>
    </div>
  );
}
