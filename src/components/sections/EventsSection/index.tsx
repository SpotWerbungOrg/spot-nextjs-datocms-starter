import SectionContainer from '@/components/layout/SectionContainer';
import { EventsSectionFragment } from '@/components/sections/EventsSection/fragment';
import Carousel from '@/components/ui/Carousel';
import { type FragmentOf, readFragment } from '@/lib/datocms/graphql';
import { type EventsFeed, loadEvents } from '@/lib/events/loadEvents';
import { useTranslations } from 'next-intl';
import { Suspense, use } from 'react';

import './index.css';

type Props = {
  data: FragmentOf<typeof EventsSectionFragment>;
};

/**
 * The cards, read with `use()` rather than `await` because this tree has to
 * stay synchronous: in draft mode it renders inside the realtime client
 * component. Server or browser, the promise comes from the same cache, so a
 * re-render finds it settled.
 */
function EventCards({ feed, limit }: { feed: EventsFeed; limit: number }) {
  const cards = use(loadEvents(feed));

  return cards.slice(0, limit).map((card, index) => {
    const meta = [card.date, card.location].filter(Boolean).join(' · ');

    return (
      <article className="event-card" key={index}>
        {card.image ? (
          /*
           * A plain img: the URL is whatever the feed says, so there is no host
           * to allow for next/image, and the provider already serves a sized
           * webp.
           */
          // eslint-disable-next-line @next/next/no-img-element
          <img className="event-card__image" src={card.image} alt="" loading="lazy" />
        ) : null}
        {meta ? <p className="event-card__meta">{meta}</p> : null}
        <h3 className="event-card__title">
          {card.url ? (
            <a
              className="event-card__link"
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {card.title}
            </a>
          ) : (
            card.title
          )}
        </h3>
        {card.summary ? <p className="event-card__summary">{card.summary}</p> : null}
      </article>
    );
  });
}

/**
 * Events from an external feed, as a grid or on the carousel. What is fetched
 * and how it is read is the feed record's business, see `lib/events`.
 *
 * Synchronous, and translated through `useTranslations`, for the same reason as
 * the slider: in draft mode this subtree is rendered by the realtime client
 * component.
 */
export default function EventsSection({ data }: Props) {
  const { heading, feed, limit, layout } = readFragment(EventsSectionFragment, data);
  const t = useTranslations();

  // No endpoint for this language and no fallback either: nothing to show.
  if (!feed.url) {
    return null;
  }

  const cards = (
    <Suspense>
      <EventCards
        feed={{
          url: feed.url,
          itemsPath: feed.itemsPath,
          fieldMap: feed.fieldMap,
          linkBase: feed.linkBase,
        }}
        limit={limit}
      />
    </Suspense>
  );

  return (
    <SectionContainer className="padding-vertical-main" width="content">
      {heading ? <h2 className="events__heading">{heading}</h2> : null}

      {layout === 'carousel' ? (
        <Carousel
          label={heading || undefined}
          previousLabel={t('t_previous')}
          nextLabel={t('t_next')}
        >
          {cards}
        </Carousel>
      ) : (
        <div className="events layout-columns">{cards}</div>
      )}
    </SectionContainer>
  );
}
