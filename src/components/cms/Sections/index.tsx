import AccordionSection from '@/components/sections/AccordionSection';
import { AccordionSectionFragment } from '@/components/sections/AccordionSection/fragment';
import EventsSection from '@/components/sections/EventsSection';
import { EventsSectionFragment } from '@/components/sections/EventsSection/fragment';
import HeroSection from '@/components/sections/HeroSection';
import { HeroSectionFragment } from '@/components/sections/HeroSection/fragment';
import ImageGridSection from '@/components/sections/ImageGridSection';
import { ImageGridSectionFragment } from '@/components/sections/ImageGridSection/fragment';
import ImageSection from '@/components/sections/ImageSection';
import { ImageSectionFragment } from '@/components/sections/ImageSection/fragment';
import ImageWithTextSection from '@/components/sections/ImageWithTextSection';
import { ImageWithTextSectionFragment } from '@/components/sections/ImageWithTextSection/fragment';
import SliderSection from '@/components/sections/SliderSection';
import { SliderSectionFragment } from '@/components/sections/SliderSection/fragment';
import TextSection from '@/components/sections/TextSection';
import { TextSectionFragment } from '@/components/sections/TextSection/fragment';
import { type ResultOf, graphql } from '@/lib/datocms/graphql';
import type { SiteLocale } from '@/lib/i18n/locales';

/**
 * The section registry: the one place that knows which sections exist.
 *
 * Adding a section means three lines here (the import, the spread in the
 * fragment, the case in the switch) plus its own folder. No query has to change:
 * every consumer selects `sections { ...SectionsFragment }` and gets whatever
 * this file allows.
 *
 * The fragment sits on the union DatoCMS generates for the field, and unmasks
 * so that this component can read `__typename` to dispatch, while each section's
 * own fragment stays masked and readable only by the section itself.
 */
export const SectionsFragment = graphql(
  /* GraphQL */ `
    fragment SectionsFragment on PageModelSectionsField @_unmask {
      ... on RecordInterface {
        id
        __typename
      }
      ...HeroSectionFragment
      ...TextSectionFragment
      ...ImageWithTextSectionFragment
      ...ImageSectionFragment
      ...ImageGridSectionFragment
      ...SliderSectionFragment
      ...AccordionSectionFragment
      ...EventsSectionFragment
    }
  `,
  [
    HeroSectionFragment,
    TextSectionFragment,
    ImageWithTextSectionFragment,
    ImageSectionFragment,
    ImageGridSectionFragment,
    SliderSectionFragment,
    AccordionSectionFragment,
    EventsSectionFragment,
  ],
);

type Section = ResultOf<typeof SectionsFragment>;

type Props = {
  data: Section[];
  locale: SiteLocale;
};

export default function Sections({ data, locale }: Props) {
  return (
    <>
      {data.map((section) => {
        switch (section.__typename) {
          case 'HeroSectionRecord':
            return <HeroSection key={section.id} data={section} locale={locale} />;
          case 'TextSectionRecord':
            return <TextSection key={section.id} data={section} locale={locale} />;
          case 'ImageWithTextSectionRecord':
            return <ImageWithTextSection key={section.id} data={section} locale={locale} />;
          case 'ImageSectionRecord':
            return <ImageSection key={section.id} data={section} />;
          case 'ImageGridSectionRecord':
            return <ImageGridSection key={section.id} data={section} />;
          case 'SliderSectionRecord':
            return <SliderSection key={section.id} data={section} />;
          case 'AccordionSectionRecord':
            return <AccordionSection key={section.id} data={section} locale={locale} />;
          case 'EventsSectionRecord':
            return <EventsSection key={section.id} data={section} />;
          default: {
            /*
             * Exhaustiveness check: add a section to the fragment above without
             * a case here and this assignment stops compiling.
             */
            const unhandled: never = section;
            return unhandled;
          }
        }
      })}
    </>
  );
}
