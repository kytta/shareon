# shareon

<img src="https://raw.githubusercontent.com/NickKaramoff/shareon/main/assets/logo.svg" align="right" alt="shareon logo — the Postal Horn emoji" width="96" height="96">

> Lightweight, stylish and ethical share buttons

- **Small.** Dependency-free. CSS+JS bundle is only 6 KB minified and gzipped.
- **Stylish.** Uses official vector logos and colors with no visual mess.
- **Ethical.** Embeds no tracking code. JS is required only for the setup.

<img src="https://raw.githubusercontent.com/NickKaramoff/shareon/main/assets/demo@2x.png" height="84" width="392" alt="shareon demo screenshot">

----
Observe the live demo here: [shareon.js.org](https://shareon.js.org)

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
const shareon = require('shareon');
// or
import shareon from 'shareon';
```

## Initialization

By default, shareon will initialize every button after page load. It also
exports the `shareon` function, that will let you repopulate your buttons with
updated information (for example, if you changed the page title):

```js
// shareon auto-initializes

window.title = "Cool new window title";
shareon();
```

If you want to postpone the initialization, you can import the `noinit`-version
of the package. You'll need to manually call the `shareon` function when you
want the buttons to be initialized:

```html
<!-- notice the 'noinit' section of the url for JS -->
<link href="https://cdn.jsdelivr.net/npm/shareon@1/dist/shareon.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/shareon@1/dist/noinit/shareon.min.js" type="text/javascript"></script>

<script type="text/javascript">
  // do something important
  shareon();
</script>
```

or, if you're using Node:

```js
const shareon = require('shareon/dist/noinit/shareon');
// or
import shareon from 'shareon/dist/noinit/shareon';

// do something important
shareon();
```

## Usage

> shareon was heavily inspired by [Likely](https://ilyabirman.net/projects/likely/),
  and has a backwards-compatible API (excluding themes and sizes).

Create a container with class `shareon` and populate it with elements, whose
classes match the names of social networks:

```html
<div class="shareon">
    <a class="facebook"></a>
    <a class="linkedin"></a>
    <a class="mastodon"></a>
    <!-- FB App ID is required for the Messenger button to function -->
    <a class="messenger" data-fb-app-id="0123456789012345"></a>
    <a class="odnoklassniki"></a>
    <a class="pinterest"></a>
    <a class="pocket"></a>
    <button class="reddit"></button>
    <button class="telegram"></button>
    <button class="twitter"></button>
    <button class="viber"></button>
    <button class="vkontakte"></button>
    <button class="whatsapp"></button>
</div>
```

If you use `<a>`, the buttons will get a `href`-attribute to them. In other cases
they will get a listener on `click` event, so you can use `<button>`s if you wish.

By default, the URL and the title of the page will be used in sharing dialogs.
To change this, you can use the `data-url` and `data-title` attributes. Use them
on the whole container or on the specific buttons:

```html
<div class="shareon" data-url="https://example.com">
    <a class="facebook" data-title="Custom Facebook title"></a>
    <a class="twitter" data-title="Custom Twitter title"></a>
</div>
```

Apart from the URL and title, some networks support extra parameters:

- you **have to** add `data-fb-app-id` to the FB Messenger button to make sharing even possible
- add `data-media` to an Odnoklassniki, Pinterest, or VK button to customize the pinned picture
- add `data-text` to a WhatsApp, Mastodon, Telegram, or Viber button to add custom message text
- add `data-via` to a Twitter or Mastodon button to mention a user

Here are all the custom parameters in their glory:

```html
<div class="shareon" data-url="https://example.com/custom-url">
    <a class="facebook" data-title="Custom Facebook title"></a>
    <a class="messenger" data-fb-app-id="0123456789012345"></a>
    <a class="pinterest" data-media="https://picsum.photos/500">Pin</a>
    <a class="telegram" data-text="Check this out!"></a>
    <a class="twitter" data-via="MyNickname"></a>
    <a class="mastodon" data-via="@MyNickname@myserver.social"></a>
    <a class="whatsapp" data-url="https://my-cool-website.com">Send</a>
</div>
```

## License

MIT © [Nikita Karamov](https://karamoff.dev)

shareon logo is the [Postal Horn emoji](https://github.com/googlefonts/noto-emoji/blob/v2020-09-16-unicode13_1/svg/emoji_u1f4ef.svg) from [Noto Emoji](https://github.com/googlefonts/noto-emoji/tree/v2020-09-16-unicode13_1), which is licensed under the [Apache License v2.0](https://github.com/googlefonts/noto-emoji/blob/v2020-09-16-unicode13_1/LICENSE).

Includes a modified version of the
[Mastodon logo](https://commons.wikimedia.org/wiki/File:Mastodon_Logotype_%28Simple%29.svg),
which is licensed under the
[APGLv3 license](https://www.gnu.org/licenses/agpl.html) or later.
