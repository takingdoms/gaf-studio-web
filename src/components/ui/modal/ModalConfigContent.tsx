import { ModalConfig } from "@/components/ui/modal/ModalContext";
import { Icons } from "@/lib/react/icons";

type ModalConfigContentProps = {
  config: ModalConfig;
  close?: () => void;
};

const MIN_WIDTH: number | string | undefined = 300;
const MAX_WIDTH: number | string | undefined = '50vw';

export default function ModalConfigContent({ config, close }: ModalConfigContentProps) {
  const titleBgCls = config.titleColor === 'error' ? 'bg-red-800' : 'bg-sky-700';

  return (
    <div
      className="grow flex flex-col overflow-hidden"
      style={{ minWidth: MIN_WIDTH, maxWidth: MAX_WIDTH }}
    >
      <div className={`${titleBgCls} flex text-white font-bold rounded-tl-sm rounded-tr-sm`}>
        <div className="overflow-hidden grow flex items-center p-2">
          <div className="truncate">
            {config.title}
          </div>
        </div>
        {close !== undefined && (
          <button
            className="flex items-center p-2 hover:bg-[#00000020]"
            onClick={close}
            // TODO optional prop and dialogue to confirm if the user really wants to close the modal
            // and lose the current progress on whatever they are doing
          >
            <Icons.Close size={20} />
          </button>
        )}
      </div>
      <div className="overflow-auto bg-white text-slate-700 rounded-bl-sm rounded-br-sm">
        {config.body}
      </div>
    </div>
  );
}
