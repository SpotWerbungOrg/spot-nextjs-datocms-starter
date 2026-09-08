# SPOT Next.js + DatoCMS starter

Starting point for SPOT client projects on Next.js + DatoCMS. Forked from
[datocms/nextjs-starter-kit](https://github.com/datocms/nextjs-starter-kit), paired with the
DatoCMS template project **SPOT Nextjs DatoCMS starter** (project id `225924`).

## Starting a new client project

The runbook lives in [docs/new-project.md](docs/new-project.md): nine steps, once per
project, in order. It is a separate file because it is read once by one person, while the
rest of this README is read while working on the code.

## Routing and locales

Every page lives under `src/app/[locale]`. German is the default and is served unprefixed,
every other locale is prefixed (`/lage`, `/en/location`). There is no Accept-Language
sniffing and no locale cookie, so a URL resolves the same way for every visitor.

One route, `[[...slug]]`, serves every page record. The page with **Is home** ticked is
served at the site root, and its own slug answers 404 so a page never has two URLs. That
flag exists instead of a magic `home` slug because the AI Translations plugin translates
slugs too: it renamed the German `home` to `startseite` and took the production site root
down with it.

Slugs are localized, which is why `/uber` and `/en/about` are the same record. The locale
switcher looks the current path up in that slug table, so it lands on the translation of
the page you are reading and falls back to the home page only when there is none.

A dead URL renders `not-found.tsx` inside the site shell, header and footer included, with
its wording taken from the CMS like the rest of the interface.

Internal pages, excluded from search results: `/typography`, `/spacing`, `/ui`.

## SEO

DatoCMS gives the title, the description and the social tags through `_seoMetaTags`, per
page, in the editors' hands. What the starter adds on top, with the reasoning next to the
code rather than here:

- **Canonical link and `og:url`**, built by the route from the URL it answers on, through
  the `pickSeoOverrides` option of `generateMetadataFn`.
- **hreflang alternates**, one per existing translation plus `x-default`, in the `<head>`
  and in the sitemap.
- **JSON-LD**, two halves joined by `@id`: `Organization` and `WebSite` from the layout,
  `WebPage` and a breadcrumb from the route. `src/lib/seo/structuredData.ts` is small on
  purpose: a project that needs `LocalBusiness` or `Event` adds the node there.
- **A social image that always resolves**, cropped to 1200x630 on the asset's focal point:
  the page's own when it has one, the project fallback otherwise.
- **Alt text as a validator** on every image field. The logo is the exception, the header
  falls back to the site name.
- **`robots.txt` and the sitemap** from the CMS, with `SITE_LIVE=false` disallowing
  everything while the domain still serves the old site.
- **`redirects.mjs`** for the legacy URLs, turned into permanent redirects that run before
  the locale routing. It ships empty, with the reasoning in its comments.

## What is inside

Three layers. Keep them apart in your head:

- **Upstream** (`src/lib/datocms`, `src/app/api`, the gql.tada wiring). Do not edit these
  in place unless you have to. Wrap them instead, so updates from the DatoCMS starter kit
  stay mergeable.
- **SPOT layer**: locale routing, the design-token layer with its two generators, the UI
  primitives and the styleguide pages, the section spine, `sitemap.ts` and `robots.ts`, and
  the two singletons that frame every page. **Layout** feeds the header and the footer:
  logo, a localized two-level navigation, footer text and links, plus how the navigation
  behaves: inline in the header or behind a menu button, the panel anchored right or top,
  its links stacked or in a row. All four combinations are styled, so the choice is the
  client's and needs no code. **Settings** holds the
  interface wording and the privacy ids, and mounts SPOT's consent tool, which is also what
  starts Google Tag Manager once the visitor has accepted, so there is no GTM snippet
  anywhere in the code.
- **Example content**: eight sections (hero, text, image with text, image, image grid,
  slider, accordion, events) and three nested blocks (link, accordion item, menu item). The
  **Abschnitte** page (`/abschnitte`, `/en/sections`) renders one of each. Copy one, then
  delete what the project does not use, in the CMS and in the code, that page included.
  The events section reads an external API described in the CMS: an **Events feed** record
  holds the URL per language, the path to the list in the response and a map from card
  field (title, summary, date, location, image, url) to a path inside one event, plus an
  optional link base for relative URLs. The section only picks a feed, a limit and a
  layout. A new API is a new feed record, a renamed field is a map edit, no deploy either
  way. Anything beyond "a string at a path" (auth, XML, date formatting, a new card field)
  is code, in `src/lib/events/loadEvents.ts`.

## Conventions

- **Sections**: one folder per section under `src/components/sections`, with the GraphQL
  fragment in its own `fragment.ts`, never in `index.tsx`. A section becomes a client
  component the moment it gets a slider or an animation, and a server module cannot read
  the exports of a `'use client'` module: keeping the fragment apart means that change
  never breaks the query. Nested blocks under `src/components/blocks` keep the fragment
  colocated, upstream style, because they stay on the server.
- **The section registry** is `src/components/cms/Sections`. Adding a section means three
  lines there, its own folder, and no query changes: every consumer selects
  `sections { ...SectionsFragment }`. The switch on `__typename` has an exhaustiveness
  check, so forgetting the renderer fails to compile instead of rendering nothing.
- **Behaviour is a client shell, content stays on the server.** A component that needs
  state takes the rendered markup as `children` rather than the data: `MenuPanel`,
  `SectionContainer` and `ui/Carousel` all work that way, so images and menus never travel
  to the browser as JavaScript. The other half of the rule: a server component cannot
  import from a `'use client'` module. Anything both sides need lives in a neutral module,
  which is what `src/lib/routing` is for.
- **Interface wording lives in the CMS, keys live in the code.** Components call
  `t('t_menu')` as usual, and `src/lib/i18n/request.ts` feeds next-intl from the
  `translations` field on Settings instead of from message files, so a client can reword a
  button without a deploy. It costs no extra request: the query is cached under the
  'datocms' tag like every other. A key with no value renders as the key itself, visibly
  wrong rather than invisibly empty. Client components receive their strings as props, so
  the message catalogue never reaches the browser bundle.
- **Queries** live in `src/lib/query`, not inside route files, because a query always ends
  up with more than one consumer: the route, its metadata, and the client component that
  re-runs it for live draft updates.
- **Never call DatoCMS from the proxy/middleware.** It runs on every request and does not
  use the Next.js Data Cache, so `force-cache` and `next.tags` are silently ignored. This
  has already caused a real API overage on another project.
- **A string field the frontend reads as a value, not as text**, is created with
  `content_link_enabled: false`. In draft mode content-link appends some 700 invisible
  characters to every string, which is what makes click-to-edit work on the text that
  reaches the page and what breaks anything going into an href, a data attribute or a
  comparison. The default is on and nothing fails loudly, so the preview just renders
  something else. Slugs are exempt, they are their own field type. Where the value comes
  from somewhere this rule cannot reach, `stripStega` at the call site is the fallback.
- **After any schema change**: `npm run generate-schema` and `npm run generate-cma-types`.
  Both also run in `prepare`, so a schema mismatch fails the build rather than breaking at
  runtime, and CI fails on drift between the CMS and the committed `schema.graphql`.

## Design tokens

`src/app/global.css` only imports layers. The system is `src/app/tokens`, in cascade order:
the scale, then the roles that point at it, then the element defaults that read the roles. A
project replaces the values in `primitives.css` and leaves the names alone.

`fluid.css` and `breakpoints.css` are generated from `src/lib/layout/fluidScale.ts` and
`src/lib/layout/breakpoints.ts` and must never be hand-edited. The scales live in TypeScript
so the CSS, the helpers and the styleguide cannot disagree, and CI fails on drift.

```bash
npm run generate-fluid-tokens && npm run generate-breakpoint-tokens
```

Type and spacing interpolate between 375px and 1920px, and past that the root font size
takes over so a wide screen keeps its proportions; body copy stays at 16px. Widths are
lanes rather than per-component max-widths (`measure`, `content`, `wide`, `bleed`), plus
`.layout-columns` for the twelve columns of the design grid. Headings are a serif with
automatic hyphenation, because German compound words overflow a 96px line.

`/typography`, `/spacing` and `/ui` render all of it, the lanes included. Look there before
inventing a value, and read the comments in `tokens/` before changing how any of it works.

## Motion

Three effects, all of them inside `@media (prefers-reduced-motion: no-preference)`, so the
whole system disappears for a visitor who asked for that: sections fade up as they enter
the viewport (an IntersectionObserver adds one class), fade back out as they leave (CSS
`animation-timeline: view()`, no JavaScript, ignored where unsupported), and a page
cross-fades on navigation. The revealed state is the default and the first section never
animates, so nothing is invisible before hydration and nothing is invisible without
JavaScript. Keep new animations in that shape.

## Environment variables

Copy `.env.local.example` to `.env.local` and fill it from the project's API tokens page.

| Variable                              | What it is                                                     |
| ------------------------------------- | -------------------------------------------------------------- |
| `DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN` | Read published content                                         |
| `DATOCMS_DRAFT_CONTENT_CDA_TOKEN`     | Read drafts, used in draft mode                                |
| `DATOCMS_CMA_TOKEN`                   | Generate `cma-types.ts`                                        |
| `DATOCMS_BASE_EDITING_URL`            | Project admin origin, scheme included, for click-to-edit links |
| `SECRET_API_TOKEN`                    | Any random string, guards the route handlers                   |
| `NEXT_PUBLIC_SITE_URL`                | Canonical origin; falls back to the Vercel production alias    |
| `SITE_LIVE`                           | `false` disallows indexing entirely                            |
| `DATOCMS_ENVIRONMENT`                 | Optional, points the whole app at a sandbox environment        |

## Draft mode and visual editing

`post-deploy` configures the **Web Previews** plugin, so these values are only needed when
setting it up by hand: preview endpoint `<origin>/api/preview-links` with an
`Authorization: Bearer` header, draft-mode route
`<origin>/api/draft-mode/enable?token=<SECRET_API_TOKEN>`, initial path `/`. The secret
travels as a header wherever the caller can send one; the draft-mode route is the exception,
because a browser follows that one and cannot add a header.

Add a second frontend pointing at `http://localhost:3000` for the same features while
developing. With draft mode on, the page subscribes to the Real-time Updates API and edits
appear without a reload.

## Checks

```bash
npm run lint && npx tsc --noEmit
```

`next build` and `next dev` write the same directory and overwrite each other's manifests,
which leaves a running dev server answering 500. To build while one is up:

```bash
NEXT_DIST_DIR=.next-check npm run build
```

CI runs those, re-runs the token generators to catch hand-edited output, compares
`schema.graphql` against the live CMS, and builds. A separate workflow smoke-tests the
first ten sitemap URLs of every successful deployment. Both need
`DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN` and `DATOCMS_DRAFT_CONTENT_CDA_TOKEN` as repository
secrets, and skip themselves with a notice when they are missing.

## Pulling updates from the DatoCMS starter kit

The `upstream` remote points at `datocms/nextjs-starter-kit` and the histories are joined:

```bash
git fetch upstream && git log --oneline HEAD..upstream/main
```

```bash
git merge upstream/main
```

Pure moves merge fine because git detects renames; conflicts appear where we changed the
contents too. Keep ours there, take theirs everywhere else, and never let a security fix
sit unmerged.

## Sending an improvement back to this base

One commit, only shared files, then from here `git fetch client && git cherry-pick <sha>`.
A commit that mixes shared and client-specific changes conflicts, because the client-only
files do not exist in this repo. And anything carrying a client name, a brand colour or a
client content model does not belong here: make the hardcoded part a parameter first, then
bring it up.
