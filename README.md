# The Boring CSS

A [BEM](https://getbem.com/) based set of classes to style your pages in an authentic way.

It is just another boring, and opinionated, CSS styling library, by [Rogério Taques](https://x.com/rogeriotaques).

It's not a framework and it has a very limited number of components. But it is still very cool 😎 and helps you building visually attractive UIs for your website or web application with peace of mind. It does ship a small 12 column grid, enough to lay out a page without reaching for a framework.

But, it supports dark mode 🌙 by default. 🤩

✨ [Demo](https://rogeriotaques.github.io/boring-css/) ✨

## Getting Started

### Installation

You can either clone this repository and copy the `boring.css` file to your project, or you can embed it to your HTML page using the CDN.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/rogeriotaques/boring-css/boring.css" />
```

Optionally, copy `boring.js` too. It powers the dark mode toggle and the tooltip auto positioning, and it is the only thing that depends on JavaScript. Everything else is pure CSS.

### Fonts

The stylesheet uses [Archivo](https://fonts.google.com/specimen/Archivo) for text and
[Source Code Pro](https://fonts.google.com/specimen/Source+Code+Pro) for code. Both are requested from Google Fonts by an
`@import` at the top of `boring.css`, so they work with no setup.

For better performance, load them yourself with `<link>` tags and drop the `@import`. The font stacks degrade to
`system-ui` and `ui-monospace` when the webfonts are unavailable.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=Source+Code+Pro:wght@500;800&display=swap"
/>
```

### Design tokens

Every color, size and font family is a CSS custom property on `:root`, so you can retheme the whole library without
touching a component.

| Token                | Purpose                                    |
| -------------------- | ------------------------------------------ |
| `--c-*`              | Colors (natural and synthetic)             |
| `--s-border-*`       | Border widths and radius                   |
| `--s-space-1…6`      | Spacing scale: 4, 8, 12, 16, 24, 32px      |
| `--s-grid-gutter`    | Gap between `.row` columns                 |
| `--s-box-shadow-*`   | Shadows for the default, hover and active  |
| `--s-transform-*`    | Transforms for the hover and active states |
| `--font-family-*`    | `base`, `heading` and `mono` families      |

## Components

It has a limited number of components, the most used ones.

- Badges
  - In 5 different colors
- Box (a multi-purpose container)
- Buttons
- Card
- Inputs (all standard types)
  - With labels
  - With helpers (small text below the input)
  - With addons (text or buttons before or after the input)
  - Grouped
- Notifications
  - In 4 different colors
- Code/Pre
  - With Prism-compatible syntax colors
- Progress bar
  - With defined progress (e.g. 50%)
  - With undefined progress (e.g. loading)
- Tooltips
- Grid

### Grid

A 12 column grid built on CSS Grid. Put your columns inside a `.row`, and give each one a `col-*` class.

```html
<div class="row">
  <div class="col-8">Eight columns.</div>
  <div class="col-4">Four columns.</div>
</div>
```

It is mobile first. Every column is full width below 768px and only takes its share from 768px up. Suffix a size
to pin it from a later breakpoint: `col-6-sm` is always a half, `col-6-md` is a half from 1024px, and `col-6-lg`
is a half from 1280px.

| Class        | Meaning                              |
| ------------ | ------------------------------------ |
| `.container` | Width wrapper: 90%, 80% at 480px, 75% capped at 60rem at 1024px |
| `.row`       | Grid container, 12 columns           |
| `.col-1…12`  | Spans that many columns              |
| `.col-*-sm`  | Same span at every breakpoint        |
| `.col-*-md`  | Same span from 1024px                |
| `.col-*-lg`  | Same span from 1280px                |

To hide content by breakpoint, use `.hide-mobile`, `.hide-tablet` or `.hide-desktop`. These hand the `display`
value back to the browser default when the content becomes visible, so they are safe to put on a button or a
flex child. `.is-hidden` hides at every width.

### Code blocks

`pre` and `code` are styled out of the box. `pre` is a dark code window with a title bar, and `code` is an inline
chip.

The code window is Prism-compatible. Add [Prism](https://prismjs.com/) to your page, then wrap the code in a
`code` element with a `language-*` class:

```html
<pre><code class="language-html">
&lt;button class="button"&gt;Button&lt;/button&gt;
</code></pre>
```

The library ships the token colors, so no Prism theme is needed. Tag names, attribute names, strings, comments
and punctuation each take a color from the design tokens, and the same colors work in light and dark mode.

## Upgrading

### Grid

This library used to ship a modified copy of [Simple Grid](https://simplegrid.io/), which has been replaced by the CSS
Grid layout above. The old grid used floats, so its gutters scaled with the viewport and the columns drifted when
their percentages were summed.

- Drop `simple-grid.css` and load `boring.css` only. `.container` is now part of the library.
- `.col-*` keeps the same names, but it now needs a `.row` parent, and `display: inline-block` is gone from `.box`,
  `.card`, `.notification`, `.progress` and `pre`. Use a `.row` and `col-*` columns for side by side content.
- `.hidden-mobile` and `.hidden-tablet` are now `.hide-mobile` and `.hide-tablet`, and `.hide-desktop` was added.

### Other visual changes

- `.is-hidden` moved from the demo stylesheet into the library. `boring.js` toggles it to swap the dark and light
  mode icons, so it has to work from `boring.css` alone.
- Text uses Archivo instead of the undefined `'Family', serif` stack, and code uses `--font-family-mono`. See
  [Fonts](#fonts) for the fallbacks.
- Success badges and notifications use black text on the green and yellow backgrounds. White failed the contrast
  check on those colors in both modes.
- Grouped avatars overlap by a fixed 32px. The old `-5%` overlap grew with the container and hid the faces at wide
  widths.
- Input addons and grouped fields no longer overlap each other. The group draws one shadow and the fields share the
  row evenly, so a group no longer overflows its container when it holds several fields.
- Cards have hover and active states, and links, buttons, and fields show a `:focus-visible` outline.

## Contributing

Feel free to add your contribution to this project with a pull request.

## License

Licensed under the [MIT License](./LICENSE).
