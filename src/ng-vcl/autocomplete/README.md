# vcl-autocomplete

## Usage:

```html
<vcl-embedded-input-group prepIcon="fa:search">
  <input vcl-input vcl-embedded-input placeholder="Search" [vcl-input-autocomplete]="acCountry" />
</vcl-embedded-input-group>

<vcl-autocomplete #acCountry="vclAutocomplete">
  <vcl-autocomplete-option type="header" label="Europe"></vcl-autocomplete-option>
  <vcl-autocomplete-option label="France" value="fr"></vcl-autocomplete-option>
  <vcl-autocomplete-option label="Germany" value="de"></vcl-autocomplete-option>
  <vcl-autocomplete-option label="Greece" value="gr"></vcl-autocomplete-option>
  <div vcl-autocomplete-content>Custom content</div>
</vcl-autocomplete>

```

#### vcl-autocomplete attributes:

Name          | Type    | Default | Description
----------    | ------- | ------- | --------------------------------------
`busy`        | boolean | false   | Shows/hides the busy indicator
`showContent` | boolean | false   | Shows/hides the content


#### vcl-autocomplete-option attributes:

Name       | Type    | Default | Description
---------- | ------- | ------- | --------------------------------------
`value`    | any     |         | The items value
`label`    | string  |         | The items label
`sublabel` | string  |         | The items sub label