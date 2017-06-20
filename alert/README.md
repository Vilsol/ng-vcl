# vcl-alert

Better javascript alert()

## Usage:

```ts
@Component({ ... })
export class MyComponent {

  constructor(private alert: AlertService) {}

  message() {
    this.alert.success('Done!');
  }

  deleteFile() {
    this.alert.open({
      text: 'Do you really want to delete the file?',
      title: 'Delete file',
      type: AlertType.Question,
      showCloseButton: true,
      showCancelButton: true,
      cancelButtonLabel: 'No',
      confirmButtonLabel: 'Yes'
    }).subscribe((result) => {
      this.alert.success('File deleted');
    }, err => {
      this.alert.error('File not deleted');
    });
  }

}
```

### Examples:

```ts
// Simple message
this.alert.success('A message');

// Message with a title
this.alert.info('A message', {
  title: 'A title'
});

// HTML Message
this.alert.open({
  text: `Use <i>as much<i> <a href="//www.w3schools.com/html/">HTML</a> as you <b>like</b>`.
  html: true
});

// Customized info message
this.alert.open({
  title: 'Information',
  text: 'This is a bit customized...',
  type: AlertType.Info,
  showCloseButton: true,
  showCancelButton: true,
  confirmButtonClass: 'vclSuggestive',
  confirmButtonPrepIcon: 'fa:bolt',
  cancelButtonColor: 'orange',
  customClass: 'vclScale130p',
  titleAlignment: AlertAlignment.Center,
  contentAlignment: AlertAlignment.Center,
  buttonAlignment: AlertAlignment.Center,
});

// Confirmation 
this.alert.open({
  title: 'Delete file',
  text: 'Do you really want to delete the file?',
  type: AlertType.Question,
  showCloseButton: true,
  showCancelButton: true,
  cancelButtonLabel: 'No',
  confirmButtonLabel: 'Yes'
}).subscribe((result) => {
  this.alert.success('File deleted');
}, err => {
  this.alert.error('Reason: ' + err.reason , 'File not deleted');
});

// Loader without buttons
this.alert.open({
  title: 'Loading',
  text: 'Hit esc to close loader',
  loader: true,
  showConfirmButton: false
});

// Handling async data
this.alert.open({
  text: 'Fetch data?',
  confirmAction: this.http.get('/foo/data'),
  showCancelButton: true
}).subscribe(result => {
  this.alert.info(result.value, { title: 'Your foo data' });
}, err => {
  this.alert.error(err, { title: 'Could not fetch data' });
});

// With an input element
this.alert.open({
  text: 'What is your name?',
  input: AlertInput.Text,
  confirmButtonLabel: 'Next',
  inputValidator: (value) => {
    if (typeof value !== 'string' || value.length < 2) {
      throw 'This is not your name!';
    }
    return true;
  }
}).subscribe(result => {
  this.alert.info('Hello ' + result.value);
}, this.alert.noop);
```

### Some helper methods

```ts
alert(text: string, opts?: AlertOptions); // Just the message
info(text: string, opts?: AlertOptions); // Message with AlertType.Info
success(text: string, opts?: AlertOptions); // Message with AlertType.Success
warning(text: string, opts?: AlertOptions); // Message with AlertType.Warning
error(text: string, opts?: AlertOptions); // Message with AlertType.Error
question(text: string, opts?: AlertOptions); // Message with AlertType.Question and showCancelButton=true
```

### API

#### AlertOptions:

All properties are optional

| Name                    | Type           | Default         | Description
| ----------------------- | -------------- | --------------- | --------------
| `text`                  | string         |                 | The main message
| `title`                 | string         |                 | A title
| `html`                  | boolean        | false           | Treats the main message as html when `true`
| `type`                  | AlertType      | None            | The type. Defines color and icon.
| `showConfirmButton`     | boolean        | true            | Show the confirmation button
| `showCancelButton`      | boolean        | false           | Show the cancel button
| `showCloseButton`       | boolean        | false           | Show the close button
| `offClickClose`         | boolean        | true            | When false, close alert on offClick
| `escClose`              | boolean        | true            | When false, close alert by pressing `esc`
| `customClass`           | string         |                 | A custom css class for the alert modal
| `confirmButtonLabel`    | string         | 'OK'            | Changes the confirm button label
| `confirmButtonClass`    | string         | 'vclEmphasized' | Adds a class to the confirm button
| `confirmButtonPrepIcon` | string         |                 | icon to be prepended to the confirm button label
| `confirmButtonAppIcon`  | string         |                 | same as `confirmButtonPrepIcon`, but appended
| `cancelButtonLabel`     | string         | 'Cancel'        | Changes the cancel button label
| `cancelButtonClass`     | string         | 'vclDanger'     | Adds a class to the cancel button
| `cancelButtonPrepIcon`  | string         |                 | icon to be prepended to the cancel button label
| `cancelButtonAppIcon`   | string         |                 | same as `cancelButtonPrepIcon`, but appended
| `loader`                | boolean        | false           | Enables loader mode
| `loaderOnConfirm`       | boolean        | false           | Enables loader mode after clicking on the confirm button instead of closing the alert modal
| `confirmAction`         | Observable     |                 | Enables loader and subscribes to observable. Closes alert when the observable completes or errors.
| `input`                 | AlertInput     | None            | Input element
| `inputValue`            | any            |                 | Default value for the input
| `inputPlaceholder`      | string         |                 | A placeholder. Shown in the input element when using AlertInput.Text
| `inputValidator`        | function       |                 | Input validator callback
| `contentAlignment`      | AlertAlignment | Left            | Alignment of the content
| `titleAlignment`        | AlertAlignment | Left            | Alignment of the title
| `iconAlignment`         | AlertAlignment | Center          | Alignment of the icon
| `buttonAlignment`       | AlertAlignment | Right           | Alignment of the buttons


#### Enums:
```ts
export enum AlertType {
  None,
  Question,
  Info,
  Success,
  Warning,
  Error
}

export enum AlertAlignment {
  Left,
  Center,
  Right
}

export enum AlertInput {
  None,
  Text
}
```
