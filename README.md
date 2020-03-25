# shareon

<img src="https://raw.githubusercontent.com/googlefonts/noto-emoji/master/png/128/emoji_u1f4ef.png" align="right" alt="Postal Horn emoji" width="96" height="96">

Lightweight, stylish and ethical share buttons.

- **Small.** Dependency-free. CSS+JS bundle is only 3.15 KB minified and gzipped.
- **Stylish.** Uses official vector logos and colors with no visual mess.
- **Ethical.** No tracking code is being embedded. JS is used for quick setup only.

<img src="https://raw.githubusercontent.com/NickKaramoff/shareon/develop/docs/screen01@2x.png" height="114" alt="shareon example">

----
Observe the live demo here: [os.karamoff.dev/shareon](https://os.karamoff.dev/shareon)

## Install

Include the link to shareon's JS and CSS in your website:

```html
<link href="https://cdn.jsdelivr.net/npm/shareon@1/dist/shareon.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/shareon@1/dist/shareon.min.js" type="text/javascript"></script>
```

or install it via NPM use it in a JS file that you will bundle:

```sh
npm install shareon
# or
yarn add shareon
```

```js
require('shareon');
```

## Usage

> shareon was heavily inspired by [Likely](https://ilyabirman.net/projects/likely/),
  and has a backwards-compatible API (excluding themes and sizes).

Create a container with class `shareon` and populate it with elements, whose
classes match the names of social networks:

```html
<div class="shareon">
    <a class="facebook"></a>
    <a class="messenger"></a>
    <a class="pinterest"></a>
    <a class="telegram"></a>
    <a class="twitter"></a>
    <a class="whatsapp"></a>
</div>
```

By default the URL and the title of the page will be used in sharing dialogs.
To change this, you can use the `data-url` and `data-title` attributes. Use them
on the whole container or on the specific links:

```html
<div class="shareon" data-url="https://example.com">
    <a class="facebook" data-title="Custom Facebook title"></a>
    <a class="twitter" data-title="Custom Twitter title"></a>
</div>
```

Apart from the URL and title, some networks support extra parameters:

- add `data-via` to a Twitter button to mention a user
- add `data-text` to a WhatsApp or Telegram button to add custom message text
- add `data-media` to a Pinterest button to customize the pinned picture

Here are all the custom parameters in their glory:

```html
<div class="shareon" data-url="https://example.com/custom-url">
    <a class="facebook" data-title="Custom Facebook title"></a>
    <a class="messenger" data-url="https://my-cool-website.com"></a>
    <a class="pinterest" data-media="https://picsum.photos/500">Pin</a>
    <a class="telegram" data-text="Check this out!"></a>
    <a class="twitter" data-via="MyNickname"></a>
    <a class="whatsapp">Send</a>
</div>
```
