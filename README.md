# shareon

<img src="https://raw.githubusercontent.com/googlefonts/noto-emoji/master/png/128/emoji_u1f4ef.png" align="right" alt="Postal Horn emoji" width="96" height="96">

Lightweight, stylish and ethical share buttons.

- **Small.** Dependency-free.
- **Stylish.** Uses official vector logos and colors.
- **Ethical.** No tracking code is being embedded.

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

<img src="https://raw.githubusercontent.com/NickKaramoff/shareon/develop/docs/screen01.png" height="60" alt="shareon example">

```html
<div class="shareon">
    <a class="facebook"></a>
    <a class="messenger" data-url="https://my-cool-website.com"></a>
    <a class="pinterest" data-media="https://picsum.photos/500">Pin</a>
    <a class="telegram" data-text="Check this out!"></a>
    <a class="twitter" data-via="MyNickname"></a>
    <a class="whatsapp">Send</a>
</div>
```
