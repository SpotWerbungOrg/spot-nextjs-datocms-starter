/*
 * Events from an external API, read through a map that lives in the CMS.
 *
 * The feed record says where the list sits in the response and, for each card
 * field, which path to read inside one event. So a renamed or moved field in
 * the API is fixed by an editor, not by a deploy, and anything the map does not
 * mention is ignored.
 *
 * A neutral module on purpose: the section that reads it is rendered on the
 * server for visitors and in the browser for the draft preview, and this has
 * to work identically on both sides.
 */

const CARD_KEYS = ['title', 'summary', 'date', 'location', 'image', 'url'] as const;

export type EventCard = { title: string } & Partial<Record<(typeof CARD_KEYS)[number], string>>;

/** The feed record, as the section reads it from the CMS. */
export type EventsFeed = {
  url: string;
  itemsPath: string;
  fieldMap: unknown;
  linkBase: string | null;
};

/** `content[0].data.items` and the like: the value at that path, or undefined. */
function readPath(value: unknown, path: string): unknown {
  return path
    .replace(/\[(\d+)\]/g, '.$1')
    .split('.')
    .filter(Boolean)
    .reduce<unknown>(
      (current, key) =>
        current !== null && typeof current === 'object'
          ? (current as Record<string, unknown>)[key]
          : undefined,
      value,
    );
}

/** Only strings survive, and an event without a title is dropped rather than shown blank. */
function toCards(response: unknown, { itemsPath, fieldMap, linkBase }: EventsFeed): EventCard[] {
  const items = readPath(response, itemsPath);

  if (!Array.isArray(items) || typeof fieldMap !== 'object' || fieldMap === null) {
    return [];
  }

  const paths = fieldMap as Record<string, unknown>;
  const cards: EventCard[] = [];

  for (const item of items) {
    const card: Partial<Record<(typeof CARD_KEYS)[number], string>> = {};

    for (const key of CARD_KEYS) {
      const value = typeof paths[key] === 'string' ? readPath(item, paths[key]) : undefined;

      if (typeof value === 'string' && value.trim()) {
        card[key] = value;
      }
    }

    /*
     * A relative url is a slug to put after the feed's link base, because the
     * ESTM `slug` field is its own JSON endpoint and the page lives on the
     * resort site. An absolute url is used as is.
     */
    if (card.url && linkBase && !card.url.includes('://')) {
      card.url = linkBase + card.url;
    }

    if (card.title) {
      cards.push(card as EventCard);
    }
  }

  return cards;
}

/*
 * One promise per feed for a while, because the section reads it with `use()`:
 * a fresh promise on every render would suspend forever. On the server this
 * also spares the provider a request per page view, on top of Next's own fetch
 * cache. A failed feed resolves to no events and stays cached like a good one,
 * so a provider outage hides the section instead of breaking the page.
 */
const cache = new Map<string, { cards: Promise<EventCard[]>; until: number }>();
const TTL = 10 * 60 * 1000;

export function loadEvents(feed: EventsFeed): Promise<EventCard[]> {
  const key = JSON.stringify(feed);
  const hit = cache.get(key);

  if (hit && hit.until > Date.now()) {
    return hit.cards;
  }

  const cards = fetch(feed.url, { next: { revalidate: 3600 } })
    .then((response) => (response.ok ? response.json() : Promise.reject(response.status)))
    .then((json) => toCards(json, feed))
    .catch((error: unknown) => {
      console.error(`Events feed ${feed.url} failed:`, error);
      return [];
    });

  cache.set(key, { cards, until: Date.now() + TTL });

  return cards;
}
