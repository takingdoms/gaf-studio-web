import ImportBackground from '@/components/app/importer/common/ImportBackground';
import ImportContent from '@/components/app/importer/common/ImportContent';
import ImportTafConfigsForm from '@/components/app/importer/taf-importer/compile-images/ImportTafConfigsForm';
import { TafImporting } from '@/components/app/importer/taf-importer/taf-importing-types';
import SolidButton from '@/components/ui/button/SolidButton';
import TextButton from '@/components/ui/button/TextButton';
import { NAMED_8_TO_1_CONVERTERS, NAMED_8_TO_4_CONVERTERS, NAMED_8_TO_5_CONVERTERS } from '@/lib/importing/image-importers/taf/named-depth-converter';
import { TafImageImporterConfig } from '@/lib/importing/image-importers/taf/taf-image-importer';
import React from 'react';

type ImportTafConfigsPreludeProps = {
  target: TafImporting.Target;
  onNext: (configs: TafImporting.ConfigPair) => void;
  onAbort: () => void;
};

export default function ImportTafConfigsPrelude({
  target,
  onNext,
  onAbort,
}: ImportTafConfigsPreludeProps) {
  const [config1555, setConfig1555] = React.useState<TafImageImporterConfig<'taf_1555'>>({
    converter8to1: NAMED_8_TO_1_CONVERTERS[0],
    converter8to5: NAMED_8_TO_5_CONVERTERS[0],
  });

  const [config4444, setConfig4444] = React.useState<TafImageImporterConfig<'taf_4444'>>({
    converter8to4: NAMED_8_TO_4_CONVERTERS[0],
  });

  const onSubmit = React.useCallback(() => {
    if (config1555 === undefined || config4444 === undefined) {
      return;
    }

    onNext({ config1555, config4444 });
  }, [onNext, config1555, config4444]);

  return (
    <ImportBackground>
      <ImportContent>
        <div className="text-sm mb-1">
          <p>Select the conversion method for each color/component channel.</p>
          <p>If you don't know what this is just use the defaults.</p>
          <TextButton
            label="Or click here for a short explanation"
            onClick={() => {}}
          />
        </div>

        <ImportTafConfigsForm
          show1555={target.kind === 'taf-pair' || target.subFormat === 'taf_1555'}
          show4444={target.kind === 'taf-pair' || target.subFormat === 'taf_4444'}
          config1555={config1555}
          config4444={config4444}
          setConfig1555={setConfig1555}
          setConfig4444={setConfig4444}
        />
      </ImportContent>

      <div className="flex justify-between">
        <SolidButton
          color="default"
          onClick={onAbort}
        >
          Exit
        </SolidButton>

        <SolidButton
          color="success"
          onClick={onSubmit}
          disabled={config1555 === undefined || config4444 === undefined}
        >
          Next
        </SolidButton>
      </div>
    </ImportBackground>
  );
}
