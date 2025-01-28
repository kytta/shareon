# Contributing to Shareon

Shareon welcomes contributions and corrections. Before contributing, please make sure you have read the guidelines below. If you decide to contribute anything, please follow the steps below.

0. Install Node.js and [pnpm](https://pnpm.io/installation)
1. Fork this repository and clone the fork
2. Create a new branch from the latest commit on `main`
3. Start hacking on the new branch
4. Commit and push to the new branch
5. Make a pull request to `main`

## Table of contents

- [Requesting a button](#requesting-a-button)
- [Adding or updating a button](#adding-or-updating-a-button)
- [Testing Package Locally](#testing-package-locally)

## Requesting a button

We welcome requests for new buttons. Before you submit a new issue, make sure:

- No one has requested the button before. If you find an existing issue or pull request, add a reaction to show your support.
- The website in question has a share page. Usually, such websites offer their own 'Share' buttons.
- The website is not illegal (e.g. piracy, malware, threatening material, spam, etc.)

If you have additional information, such as the address of the Share page, links to the documentation or to other implementations, put it in the issue description.

## Adding or updating a button

**Note**: If you decide to add a new button without requesting it first, the requirements above still apply.

### 1. Identify share page address

If a website has its own 'Share' button, it will also usually have some documentation for it. This might be the SDK docs or the button constructor. In some cases, there is nothing of sorts, and one has to reverse-engineer this.

Most websites use a fixed share page that expects URL parameters to contain metadata like URL, page title, and/or post text. For example, the Twitter share page has the base URL `https://twitter.com/intent/tweet` and can accept URL parameters `url`, `text`, `via`, and `hashtags`.

### 2. Add JavaScript code for the button

For the button to work, it needs an entry in the `urlBuilderMap`. It's located on top of `src/shareon.js`.

The key of the map is the ID of the website, which is usually its name. It should be all lowercase and only include dashes. Try to keep it as short as possible, e.g. `teams` instead of `microsoft-teams`.

The value of the map is a function that accepts a "preset" (aka "page data") object. This object contains data about the page or of the post, such as url, title, media, text, via, hashtags, and Facebook app ID, all URL-encoded. The function should return a complete Share URL.

> **Note** This is subject to change in Shareon v3, where we plan to migrate to a `URL` builder. See [issue #61 on GitHub](https://github.com/kytta/shareon/issues/61) for information.

Once you;ve added the entry, the button is ready to go. If the button accepts properties that are not defined in the "preset", let us know before implementing it.

### 3. Add the icon

We heavily rely on icons from the [Simple Icons](https://github.com/simple-icons/simple-icons) project. As such, the requirements for the icons are similar.

- The icon MUST be SVG
- The name the icon MUST match the `urlBuilderMap` key
- The icon MUST have a `viewBox` of `0 0 24 24` and have no dimensions
- The icon must have the maximal size possible, i.e. the icon should be touching at least two sides of the viewbox
- The icon MUST be all white, either via the `fill` or via the `stroke` attribute

The easiest path for you to go is to just find the icon on Simple Icons and download it to `src/icons/`. They already meet all requirements. You do have to change the colour from `currentColor` to `#fff`, though.

If the website does not have its icon on Simple Icons, follow [their contributing guide](https://github.com/simple-icons/simple-icons/blob/develop/CONTRIBUTING.md) to request and/or add it. We will assist you in this task, if needed.

### 4. Optimize the icon

All icons for Shareon should be optimized with the [SVGO tool](https://github.com/svg/svgo). The pre-commit hook you've installed does it automatically before commiting. Alternatively, you can run SVGO on the icon you've just added like so:

```bash
npx svgo src/icons/ICONNAME.svg
```

After optimizing the icon, double-check it against your original version to ensure no visual imperfections have crept in.

### 5. Add styles

In `src/shareon.css`, add two lines for the icon: one for the colour and one for the icon. The class of the button MUST match the `urlBuilderMap` key and the icon name. The colour should be the official website colour, preferably taken from Simple Icons. The icon should be referenced using the local path, it will be inlined on build. Example:

```css
.shareon > .pinterest {
  background-color: #bd081c;  /* Official colour, as taken from Simple Icons */
}
.shareon > .pinterest:before {
  background-image: url("icons/pinterest.svg");  /* Icon taken Simple Icons and optimized with SVGO */
}
```

### 6. Test the icon

Open `index.html` in the repository root and add the icon to the list of all buttons. Then, launch the dev server:

```sh
pnpm dev --open
```

The final button should:

- Have a proper icon. It should:
  - be white
  - be vertically and horizontally centered
- Open the share page on click
- Fill out the data on the share page

### 7. Update docs

Update `README.md` to include the new button in the code snippets. If the button supports non-standard (not just `url` or `title`) `data-` attributes, mention it in 'Share metadata'

### 8. Create a Pull Request

Once you've completed the previous steps, create a pull request to merge your edits into the `main` branch. You can run `pnpm lint` to check if there are any issues you still need to address. If there are any, run `pre-commit`, and it will fix most of them.
