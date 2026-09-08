import { graphql } from '@/lib/datocms/graphql';

/*
 * The URL falls back to German: a language the provider has no feed for shows
 * the German events rather than an empty section.
 */
export const EventsSectionFragment = graphql(/* GraphQL */ `
  fragment EventsSectionFragment on EventsSectionRecord {
    heading
    limit
    layout
    feed {
      url(fallbackLocales: [de])
      linkBase(fallbackLocales: [de])
      itemsPath
      fieldMap
    }
  }
`);
