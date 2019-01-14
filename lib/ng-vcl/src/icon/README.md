# vcl-icon

Icon which can be based on glyphs from icon fonts, inline svg and bitmaps.

The `label` is never displayed, it is only for accessibility with screen
readers.
The `hidden` attribute is only reflected in the `aria-hidden` property which
allows to hide the icon to screen readers, if it is only of presentational character.
See <http://www.filamentgroup.com/lab/bulletproof_icon_fonts.html> for details.

## Usage

As a component

```html
<vcl-icon icon="fa:chevron-right" label="chevron right"></vcl-icon>
```

or via an attribute

```html
<span vcl-icon icon="..."></span>
```

With image resource

```html
<vcl-icon alt="cog">
  <img src="http://materialdesignicons.com/api/download/icon/png/E4A14909-3821-4DB1-A739-4DA464ABEEB7/36">
</vcl-icon>
```

With SVG

```html
<vcl-icon  [class]="'vclIconSize1'">
  <svg  ...></svg>
</vcl-icon>
```

### API

#### Attributes

| Name                | Type        | Default  | Description
| ------------        | ----------- | -------- |--------------
| `icon`              | string      |          | Icon generator lookup via icon class provider
| `src`               | string      |          | URL of a graphics resource
| `svguse`            | string      |          | Generates an SVG `use` tag referencing the value
