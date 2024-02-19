import PreludeButton from "@/components/app/prelude/PreludeButton";
import PreludeChooseFile from "@/components/app/prelude/PreludeChooseFile";
import PreludeHeader from "@/components/app/prelude/PreludeHeader";
import Body from "@/components/ui/layout/Body";
import { Workspace } from "@/lib/gaf-studio/state/workspace";
import React from "react";

type PreludeScreenProps = {
  onInit: (workspace: Workspace) => void;
};

export default function PreludeScreen({ onInit }: PreludeScreenProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <Body>
      <div className="grow flex flex-col justify-center items-center overflow-auto bg-gray-300">
        <div className="flex">

          <div className="flex flex-col space-y-2 m-4">
            <PreludeHeader>Open existing file</PreludeHeader>
            <PreludeChooseFile
              onInit={onInit}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>

          <div className="border border-dashed border-gray-400 my-4 mx-8" />

          <div className="flex flex-col space-y-2 m-4">
            <PreludeHeader>Create new project</PreludeHeader>
            <div
              className="flex flex-col space-y-2"
              style={{ minHeight: 200 }}
            >
              <PreludeButton onClick={() => onInit(Workspace.initBlank('taf')) }>
                TAF
              </PreludeButton>
              <PreludeButton onClick={() => onInit(Workspace.initBlank('gaf')) }>
                GAF
              </PreludeButton>
            </div>
          </div>

        </div>
      </div>
    </Body>
  );
}
