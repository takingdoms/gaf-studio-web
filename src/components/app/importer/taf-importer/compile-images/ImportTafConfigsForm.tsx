import IconButton from '@/components/ui/button/IconButton';
import Select from '@/components/ui/select/Select';
import { NAMED_8_TO_1_CONVERTERS, NAMED_8_TO_4_CONVERTERS, NAMED_8_TO_5_CONVERTERS, NamedDepthConverter } from '@/lib/importing/image-importers/taf/named-depth-converter';
import { TafImageImporterConfig } from '@/lib/importing/image-importers/taf/taf-image-importer';
import { Icons } from '@/lib/react/icons';
import LibGaf from '@takingdoms/lib-gaf';
import React from 'react';

type ImportTafConfigsFormProps = {
  show1555: boolean;
  config1555: TafImageImporterConfig<'taf_1555'>;
  setConfig1555: (config1555: TafImageImporterConfig<'taf_1555'>) => void;
  show4444: boolean;
  config4444: TafImageImporterConfig<'taf_4444'>;
  setConfig4444: (config4444: TafImageImporterConfig<'taf_4444'>) => void;
};

export default function ImportTafConfigsForm({
  show1555,
  config1555,
  setConfig1555,
  show4444,
  config4444,
  setConfig4444,
}: ImportTafConfigsFormProps) {
  const value8to1 = config1555.converter8to1;
  const setValue8to1 = (converter8to1: NamedDepthConverter<8, 1>) => {
    setConfig1555({ ...config1555, converter8to1 });
  };

  const value8to5 = config1555.converter8to5;
  const setValue8to5 = (converter8to5: NamedDepthConverter<8, 5>) => {
    setConfig1555({ ...config1555, converter8to5 });
  };

  const value8to4 = config4444.converter8to4;
  const setValue8to4 = (converter8to4: NamedDepthConverter<8, 1>) => {
    setConfig4444({ ...config4444, converter8to4 });
  };

  return (
    <div className="flex space-x-8">
      {show1555 && (
        <div className="flex-1">
          <div className="text-center font-semibold mb-2">1555 Settings</div>

          <div className="flex flex-col space-y-4">
            <SubFormWrapper
              label="8-bit to 1-bit (Alpha)"
              namedConverters={NAMED_8_TO_1_CONVERTERS}
              value={value8to1}
              setValue={setValue8to1}
            />

            <SubFormWrapper
              label="8-bit to 5-bit (Red, Green, Blue)"
              namedConverters={NAMED_8_TO_5_CONVERTERS}
              value={value8to5}
              setValue={setValue8to5}
            />
          </div>
        </div>
      )}

      {show4444 && (
        <div className="flex-1">
          <div className="text-center font-semibold mb-2">4444 Settings</div>

          <SubFormWrapper
            label="8-bit to 4-bit (ARGB)"
            namedConverters={NAMED_8_TO_4_CONVERTERS}
            value={value8to4}
            setValue={setValue8to4}
          />
        </div>
      )}

      {(!show1555 || !show4444) && (
        <div className="flex-1" />
      )}
    </div>
  );
}

function SubFormWrapper<TIn extends LibGaf.BitDepth, TOut extends LibGaf.BitDepth>({
  label,
  namedConverters,
  value,
  setValue,
}: {
  label: string;
  namedConverters: readonly NamedDepthConverter<TIn, TOut>[];
  value: NamedDepthConverter<TIn, TOut>;
  setValue: (value: NamedDepthConverter<TIn, TOut>) => void;
}) {
  const options8to4 = React.useMemo(() => {
    return namedConverters.map((conv) => ({
      id: conv.id,
      label: conv.name,
    }));
  }, [namedConverters]);

  const onClickShowDesc = React.useCallback(() => {
    // TODO
  }, []);

  return (
    <div>
      <div className="text-xs font-semibold">{label}</div>
      <div className="flex items-center space-x-1">
        <Select
          options={options8to4}
          value={value.id}
          onChange={(id) => setValue(namedConverters.find((conv) => conv.id === id)!)}
        />

        <IconButton
          onClick={onClickShowDesc}
          icon={Icons.Help}
          size={18}
        />
      </div>
    </div>
  );
}
