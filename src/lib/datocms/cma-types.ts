import type { ItemTypeDefinition } from '@datocms/cma-client';

type EnvironmentSettings = {
  locales: 'de' | 'en';
};

export type AccordionItem = ItemTypeDefinition<
  EnvironmentSettings,
  'b4G7LWbdQmmD4rWXstKM8w',
  {
    heading: {
      type: 'string';
    };
    body: {
      type: 'structured_text';
    };
  }
>;
export const AccordionItem = {
  ID: 'b4G7LWbdQmmD4rWXstKM8w',
  REF: { type: 'item_type', id: 'b4G7LWbdQmmD4rWXstKM8w' },
} as const;

export type AccordionSection = ItemTypeDefinition<
  EnvironmentSettings,
  'GHPlTJWYQL-RItt_mgAzYg',
  {
    heading: {
      type: 'string';
    };
    items: {
      type: 'rich_text';
      blocks: AccordionItem;
    };
  }
>;
export const AccordionSection = {
  ID: 'GHPlTJWYQL-RItt_mgAzYg',
  REF: { type: 'item_type', id: 'GHPlTJWYQL-RItt_mgAzYg' },
} as const;

export type EventsFeed = ItemTypeDefinition<
  EnvironmentSettings,
  'FcuSWWAnQ3-pOJjo3230zQ',
  {
    name: {
      type: 'string';
    };
    url: {
      type: 'string';
      localized: true;
    };
    link_base: {
      type: 'string';
      localized: true;
    };
    items_path: {
      type: 'string';
    };
    field_map: {
      type: 'json';
    };
  }
>;
export const EventsFeed = {
  ID: 'FcuSWWAnQ3-pOJjo3230zQ',
  REF: { type: 'item_type', id: 'FcuSWWAnQ3-pOJjo3230zQ' },
} as const;

export type EventsSection = ItemTypeDefinition<
  EnvironmentSettings,
  'CaeEHYfTQtafzYySWECQyQ',
  {
    heading: {
      type: 'string';
    };
    feed: {
      type: 'link';
    };
    limit: {
      type: 'integer';
    };
    layout: {
      type: 'string';
    };
  }
>;
export const EventsSection = {
  ID: 'CaeEHYfTQtafzYySWECQyQ',
  REF: { type: 'item_type', id: 'CaeEHYfTQtafzYySWECQyQ' },
} as const;

export type HeroSection = ItemTypeDefinition<
  EnvironmentSettings,
  'KyTRgL91Te6FjX_2BeAg7g',
  {
    heading: {
      type: 'string';
    };
    body: {
      type: 'text';
    };
    image: {
      type: 'file';
    };
    link: {
      type: 'single_block';
      blocks: Link;
    };
  }
>;
export const HeroSection = {
  ID: 'KyTRgL91Te6FjX_2BeAg7g',
  REF: { type: 'item_type', id: 'KyTRgL91Te6FjX_2BeAg7g' },
} as const;

export type ImageBlock = ItemTypeDefinition<
  EnvironmentSettings,
  'dZOhbVOTSpeaaA-wQMgPCA',
  {
    asset: {
      type: 'file';
    };
  }
>;
export const ImageBlock = {
  ID: 'dZOhbVOTSpeaaA-wQMgPCA',
  REF: { type: 'item_type', id: 'dZOhbVOTSpeaaA-wQMgPCA' },
} as const;

export type ImageGalleryBlock = ItemTypeDefinition<
  EnvironmentSettings,
  'CoOdvsbUR8GLtGeuenXzMw',
  {
    assets: {
      type: 'gallery';
    };
  }
>;
export const ImageGalleryBlock = {
  ID: 'CoOdvsbUR8GLtGeuenXzMw',
  REF: { type: 'item_type', id: 'CoOdvsbUR8GLtGeuenXzMw' },
} as const;

export type ImageGridSection = ItemTypeDefinition<
  EnvironmentSettings,
  'M2XshV_sQSeKMOToYJHjxg',
  {
    heading: {
      type: 'string';
    };
    images: {
      type: 'gallery';
    };
  }
>;
export const ImageGridSection = {
  ID: 'M2XshV_sQSeKMOToYJHjxg',
  REF: { type: 'item_type', id: 'M2XshV_sQSeKMOToYJHjxg' },
} as const;

export type ImageSection = ItemTypeDefinition<
  EnvironmentSettings,
  'Lv51zZ96QfGEd6qx_uOKVQ',
  {
    image: {
      type: 'file';
    };
    width: {
      type: 'string';
    };
    aspect_ratio: {
      type: 'string';
    };
    caption: {
      type: 'string';
    };
  }
>;
export const ImageSection = {
  ID: 'Lv51zZ96QfGEd6qx_uOKVQ',
  REF: { type: 'item_type', id: 'Lv51zZ96QfGEd6qx_uOKVQ' },
} as const;

export type ImageWithTextSection = ItemTypeDefinition<
  EnvironmentSettings,
  'NFIW2OfgRTex9wmLUMi2Pw',
  {
    heading: {
      type: 'string';
    };
    body: {
      type: 'text';
    };
    image: {
      type: 'file';
    };
    link: {
      type: 'single_block';
      blocks: Link;
    };
    inverted_layout: {
      type: 'boolean';
    };
  }
>;
export const ImageWithTextSection = {
  ID: 'NFIW2OfgRTex9wmLUMi2Pw',
  REF: { type: 'item_type', id: 'NFIW2OfgRTex9wmLUMi2Pw' },
} as const;

export type Layout = ItemTypeDefinition<
  EnvironmentSettings,
  'DTCftzw4S4aKyD39qpXpgQ',
  {
    footer_text: {
      type: 'text';
      localized: true;
    };
    navigation_style: {
      type: 'string';
    };
    footer_links: {
      type: 'rich_text';
      blocks: Link;
      localized: true;
    };
    logo: {
      type: 'file';
    };
    panel_position: {
      type: 'string';
    };
    panel_orientation: {
      type: 'string';
    };
    social_links: {
      type: 'rich_text';
      blocks: Link;
    };
    navigation: {
      type: 'rich_text';
      blocks: MenuItem;
      localized: true;
    };
  }
>;
export const Layout = {
  ID: 'DTCftzw4S4aKyD39qpXpgQ',
  REF: { type: 'item_type', id: 'DTCftzw4S4aKyD39qpXpgQ' },
} as const;

export type Link = ItemTypeDefinition<
  EnvironmentSettings,
  'ekip_ngUQxiVGyG8j0KIgQ',
  {
    label: {
      type: 'string';
    };
    page: {
      type: 'link';
    };
    external_url: {
      type: 'string';
    };
    open_in_new_tab: {
      type: 'boolean';
    };
  }
>;
export const Link = {
  ID: 'ekip_ngUQxiVGyG8j0KIgQ',
  REF: { type: 'item_type', id: 'ekip_ngUQxiVGyG8j0KIgQ' },
} as const;

export type MenuItem = ItemTypeDefinition<
  EnvironmentSettings,
  'K4xLvAO-RuSKyqg2C6KcsA',
  {
    link: {
      type: 'single_block';
      blocks: Link;
    };
    dropdown: {
      type: 'rich_text';
      blocks: Link;
    };
  }
>;
export const MenuItem = {
  ID: 'K4xLvAO-RuSKyqg2C6KcsA',
  REF: { type: 'item_type', id: 'K4xLvAO-RuSKyqg2C6KcsA' },
} as const;

export type Page = ItemTypeDefinition<
  EnvironmentSettings,
  'JdG722SGTSG_jEB1Jx-0XA',
  {
    is_home: {
      type: 'boolean';
    };
    sections: {
      type: 'rich_text';
      blocks:
        | HeroSection
        | TextSection
        | ImageWithTextSection
        | ImageSection
        | ImageGridSection
        | SliderSection
        | AccordionSection
        | EventsSection;
      localized: true;
    };
    seo_settings_social: {
      type: 'seo';
    };
    seo_analysis: {
      type: 'json';
    };
    title: {
      type: 'string';
      localized: true;
    };
    slug: {
      type: 'slug';
      localized: true;
    };
  }
>;
export const Page = {
  ID: 'JdG722SGTSG_jEB1Jx-0XA',
  REF: { type: 'item_type', id: 'JdG722SGTSG_jEB1Jx-0XA' },
} as const;

export type SchemaMigration = ItemTypeDefinition<
  EnvironmentSettings,
  'czn4j4ABTwGwvak0mnQy1g',
  {
    name: {
      type: 'string';
    };
  }
>;
export const SchemaMigration = {
  ID: 'czn4j4ABTwGwvak0mnQy1g',
  REF: { type: 'item_type', id: 'czn4j4ABTwGwvak0mnQy1g' },
} as const;

export type SiteSetting = ItemTypeDefinition<
  EnvironmentSettings,
  'Io51E491RmKvwEJAbiWkaQ',
  {
    cid: {
      type: 'string';
    };
    translations: {
      type: 'json';
    };
    gtm: {
      type: 'string';
    };
  }
>;
export const SiteSetting = {
  ID: 'Io51E491RmKvwEJAbiWkaQ',
  REF: { type: 'item_type', id: 'Io51E491RmKvwEJAbiWkaQ' },
} as const;

export type SliderSection = ItemTypeDefinition<
  EnvironmentSettings,
  'a6LyM9ltTn-5IMxW5sWj3Q',
  {
    heading: {
      type: 'string';
    };
    images: {
      type: 'gallery';
    };
  }
>;
export const SliderSection = {
  ID: 'a6LyM9ltTn-5IMxW5sWj3Q',
  REF: { type: 'item_type', id: 'a6LyM9ltTn-5IMxW5sWj3Q' },
} as const;

export type TextSection = ItemTypeDefinition<
  EnvironmentSettings,
  'AAemZ7YeTUygT1tcKBQgMQ',
  {
    heading: {
      type: 'string';
    };
    body: {
      type: 'structured_text';
      blocks: ImageGalleryBlock | ImageBlock | VideoBlock;
    };
  }
>;
export const TextSection = {
  ID: 'AAemZ7YeTUygT1tcKBQgMQ',
  REF: { type: 'item_type', id: 'AAemZ7YeTUygT1tcKBQgMQ' },
} as const;

export type VideoBlock = ItemTypeDefinition<
  EnvironmentSettings,
  'duRvS1PrT4u6QGJZUmyINA',
  {
    asset: {
      type: 'file';
    };
  }
>;
export const VideoBlock = {
  ID: 'duRvS1PrT4u6QGJZUmyINA',
  REF: { type: 'item_type', id: 'duRvS1PrT4u6QGJZUmyINA' },
} as const;

export type AnyBlock =
  | AccordionItem
  | AccordionSection
  | EventsSection
  | HeroSection
  | ImageBlock
  | ImageGalleryBlock
  | ImageGridSection
  | ImageSection
  | ImageWithTextSection
  | Link
  | MenuItem
  | SliderSection
  | TextSection
  | VideoBlock;
export type AnyModel = EventsFeed | Layout | Page | SchemaMigration | SiteSetting;
export type AnyBlockOrModel = AnyBlock | AnyModel;
