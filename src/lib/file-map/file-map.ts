import LibGaf from '@takingdoms/lib-gaf';
import { DeepReadonly } from 'ts-essentials';

type UnknownGapSection = LibGaf.Reader.Mapping.BaseSection<'unknown-gap', LibGaf.Reader.Mapping.RawBytes>;

type Section = LibGaf.Reader.Mapping.Section
type SectionExtra = Section | UnknownGapSection;
type SectionForLabel<TLabel extends string> = SectionExtra & { label: TLabel };

type OriginalFileMapLabel = LibGaf.Reader.Mapping.Section['label'];
export type FileMapLabel = OriginalFileMapLabel | UnknownGapSection['label'];

//:: Normalized ------------------------------------------------------------------------------------

export type NormalizedFileMap = {
  areaGroups: FileMapAreaGroup[];
};

export type FileMapAreaGroup<TLabel extends FileMapLabel = FileMapLabel> = {
  label: TLabel;
  areas: SectionForLabel<TLabel>[];
};

//:: Utils -----------------------------------------------------------------------------------------

export function normalizeFileMap(fileMap: DeepReadonly<Section[]>): NormalizedFileMap {
  const areaGroups: FileMapAreaGroup[] = [];

  const sortedAreas = [...fileMap];
  sortedAreas.sort((a1, a2) => {
    return a1.offset - a2.offset;
  });

  const deduplicatedAreas: Section[] = [];
  sortedAreas.forEach((next) => {
    if (deduplicatedAreas.length === 0) {
      deduplicatedAreas.push(next);
      return;
    }

    const last = deduplicatedAreas[deduplicatedAreas.length - 1];

    if (last.label === next.label
      && last.offset === next.offset
      && last.length === next.length
    ) {
      return;
    }

    deduplicatedAreas.push(next);
  });

  for (let i = 0; i < deduplicatedAreas.length; i++) {
    const currArea = deduplicatedAreas[i];
    const lastAreaGroup = areaGroups.length > 0 ? areaGroups[areaGroups.length - 1] : undefined;

    if (lastAreaGroup !== undefined && lastAreaGroup.label === currArea.label) {
      lastAreaGroup.areas.push(currArea);

      continue;
    }

    areaGroups.push({
      label: currArea.label,
      areas: [ currArea ],
    });
  }

  const finalAreaGroups: typeof areaGroups = [];

  for (let i = 0; i < areaGroups.length; i++) {
    const currGroup = areaGroups[i];

    if (i > 0) {
      const prevGroup = areaGroups[i - 1];
      const prevGroupLastArea = prevGroup.areas[prevGroup.areas.length - 1];
      const prevGroupEnd = prevGroupLastArea.offset + prevGroupLastArea.length;
      const currGroupStart = currGroup.areas[0].offset;
      const gapSize = currGroupStart - prevGroupEnd;

      if (gapSize > 0) {
        // console.log(`${prevGroupEnd} ~ ${currGroupStart}`);

        finalAreaGroups.push({
          label: 'unknown-gap',
          areas: [
            {
              label: 'unknown-gap',
              content: LibGaf.Reader.Mapping.RawBytes,
              offset: prevGroupEnd,
              length: currGroupStart - prevGroupEnd,
            },
          ],
        })
      }
    }

    finalAreaGroups.push(currGroup);
  }

  return {
    areaGroups: finalAreaGroups,
  };
}
