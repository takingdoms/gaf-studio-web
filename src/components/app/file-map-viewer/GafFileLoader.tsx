import React from "react";
import LibGaf from 'lib-gaf';
import { GafResultWrapper, GafResultWrapperContext } from "@/components/app/logical/GafResultWrapperContext";

type GafFileLoaderProps = {
  children: React.ReactNode; // what is shown AFTER the gaf has been loaded
};

export default function GafFileLoader({ children }: GafFileLoaderProps) {
  const [gafResult, setGafResult] = React.useState<GafResultWrapper>();
  const [isLoading, setIsLoading] = React.useState(false);

  const loadFile = React.useCallback((file: File) => {
    setIsLoading(true);

    file.arrayBuffer()
      .then((buffer) => {
        const bytes = new Uint8Array(buffer);
        const result = LibGaf.Reader.readFromBuffer(bytes);

        setGafResult({
          fileData: bytes,
          gafResult: result,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (gafResult === undefined) {
    if (isLoading) {
      return (
        <div className="p-4">
          Loading...
        </div>
      );
    }

    return (
      <div className="p-4">
        <input
          type="file"
          value={undefined}
          onChange={(ev) => {
            const files = ev.target.files;
            if (files?.length === 1) {
              loadFile(files[0]);
            }
          }}
        />
      </div>
    );
  }

  return (
    <GafResultWrapperContext.Provider value={gafResult}>
      {children}
    </GafResultWrapperContext.Provider>
  );
}
