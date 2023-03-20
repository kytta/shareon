# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2023-03-20

### Added

- "Copy URL" button in https://github.com/kytta/shareon/pull/44

### Behind-the-scenes

- Added pre-commit hooks in https://github.com/kytta/shareon/pull/47
- Fixed `size-limit-action` branch in https://github.com/kytta/shareon/pull/48

## [2.0.2] - 2023-01-25

### Changed

- Sourcemaps are not being output any more
  - They're being loaded automatically and don't serve any other purpose.
    Disabling those helps us save a few bytes
- Change minifier to esbuild (instead of terser)
  - This disables the minification of ESM, which is a good thing, because
    otherwise the file can't be tree-shaken properly
- Shareon is now `type: "module"`
  - This doesn't change anything for the end users
- Banner was removed
  - It took unnecessary bytes, and embedding it was somewhat buggy
- Browserslist config now targets `defaults`
  - Opera 90 and Samsung Browser 17 aren't targeted. Shareon will still work on
    these browsers.
  - the previous config (using `last 3 versions instead` of `last 2 versions`)
    didn't change coverage that much

### Behind-the-scenes

- Updated to Vite v4
- CSS is now bundled using Vite
  - this makes the build script leaner; it's still processed with PostCSS
- Moved PostCSS and ESLint config to package.json

## [2.0.1] - 2023-01-23

### Changed

- Mastodon button updated to match the new style (#42)

## [2.0.0] - 2021-02-13

### Added

- **BREAKING:** new (auto-)init behaviour, inspired by [petite-vue](https://github.com/vuejs/petite-vue)

  - `require`, `import`, or use `<script>` to include Shareon without
    initialization
  - use exported `initializeShareon` function in Node to initialize Shareon
  - use `init` attribute in `script` to initialize Shareon in-browser

    ```html
    <script src="path/to/shareon.js" init>
    ```

- CSS export for use in Webpack/Rollup/etc. ([#35](https://github.com/kytta/shareon/issues/35))

  ```js
  import "shareon/css";
  ```

  ```js
  require("shareon/css");
  ```

### Changed

- **BREAKING:** default version of the package doesn't auto-initialize buttons
- **BREAKING:** instead of default export, named exports are now used. If IIFE
  is used, the global object's name is now `Shareon`, and it has one `init()`
  method
- updated logos and colours for some social networks
- removed mixins, defining the code/styles directly in the files
- use [Vite](https://vitejs.dev/) for building, reducing the devDependencies
  tree and build times drastically
  - **BREAKING:** newly built files offer worse browser support
- change code style to [Prettier](https://prettier.io/)

### Removed

- **BREAKING:** `noinit` version of the package is removed

## [1.6.3] - 2022-02-02

### Changed

- update URL for the [toot](https://github.com/kytta/toot) instance
- update URLs and usernames in metadata
- update dev dependencies
- migrate to PNPM

## [1.6.2] - 2021-06-29

### Security

- updated build dependencies

## [1.6.1] - 2021-01-17

### Added

- Add CHANGELOG as file

### Fixed

- Fix LinkedIn URL

## [1.6.0] - 2020-09-28

### Changed

- Add parameter for App ID for Messenger button (#17, #29)
  - now you **have to** include `data-fb-app-id` to your Messenger buttons

## [1.5.0] - 2020-09-24

### Added

- Add Mastodon button (#23, #27)

## [1.4.5] - 2020-09-22

> Version 1.4.3 was skipped due to an error in the deployment process
> Version 1.4.4 is deprecated due to non-minified build files

### Fixed

- Fix transpilation for legacy browsers (#19, #21)
- Fix `<button>`s not behaving correctly if there are `<a>`s further on the page
- Fix PostCSS not applying any plugins (#22)

## [1.4.2] - 2020-09-18

### Fixed

- Fix WhatsApp button on desktop (#18, #20)

## [1.4.1] - 2020-08-01

### Changed

- move codebase from TypeScript to JavaScript+JSDoc
- replace Sass with CSS+PostCSS

## [1.4.0] - 2020-07-30

### Changed

- Optimise code
  - package size got reduced down to 937 kb (.min.js) / 840 kb (.cjs/.mjs)
  - `for` loops were optimised to cut down execution time

## [1.3.1] - 2020-07-30

### Fixed

- Fix documentation

## [1.3.0] - 2020-07-26

### Added

- Add `init()` function to shareon (#11, #13)
  - this allows not only to postpone the initialization of shareon but also to re-run it

## [1.2.1] - 2020-07-12

### Changed

- Optimize icon SVG files to match one standard (#8)

## [1.2.0] - 2020-07-04

### Added

- Add LinkedIn button (#5)
- Add Pocket button
- Add Reddit button
- Add Viber button

## [1.1.5] - 2020-06-26

### Added

- Add building to ESM

### Changed

- Update README and docs

### Fixed

- Fix unwanted border on `<button>` hover

## [1.1.4] - 2020-06-26

### Changed

- Rearrange fields in package.json
- Change `node-sass` to `sass`
- Update Rollup config
- Update ESLint config

## [1.1.3] - 2020-06-25

### Changed

- Update dependencies

## [1.1.2] - 2020-03-30

### Changed

- Shorten the banner in JS and CSS files

### Fixed

- Fix inconsistent spacing between buttons

## [1.1.1] - 2020-03-27

### Fixed

- Fix incorrect spacing between button rows when wrapped

## [1.1.0] - 2020-03-27

### Added

- Add Odnoklassniki button
- Add VK button

## [1.0.0] - 2020-03-26

### Added

- Add install instructions to README
- Add usage instructions to README

## [1.0.0-beta.3] - 2020-03-26

### Added

- Add Facebook button
- Add Messenger button
- Add Pinterest button
- Add WhatsApp button

### Changed

- Update colour of Telegram button
- Rename `shareon.css` to `shareon.min.css`

### Removed

- Remove building to ESM

## [1.0.0-beta.2] - 2020-03-26

### Fixed

- Fix package files not being published to NPM

## [1.0.0-beta.1] - 2020-03-26

Initial release of shareon

### Added

- Add Telegram button
- Add Twitter button

[unreleased]: https://github.com/kytta/shareon/compare/v2.1.0...main
[2.1.0]: https://github.com/kytta/shareon/compare/v2.0.2...v2.1.0
[2.0.2]: https://github.com/kytta/shareon/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/kytta/shareon/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/kytta/shareon/compare/v1.6.3...v2.0.0
[1.6.2]: https://github.com/kytta/shareon/compare/v1.6.2...v1.6.3
[1.6.2]: https://github.com/kytta/shareon/compare/v1.6.1...v1.6.2
[1.6.1]: https://github.com/kytta/shareon/compare/v1.6.0...v1.6.1
[1.6.0]: https://github.com/kytta/shareon/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/kytta/shareon/compare/v1.4.5...v1.5.0
[1.4.5]: https://github.com/kytta/shareon/compare/v1.4.2...v1.4.5
[1.4.2]: https://github.com/kytta/shareon/compare/v1.4.1...v1.4.2
[1.4.1]: https://github.com/kytta/shareon/compare/v1.4.0...v1.4.1
[1.4.0]: https://github.com/kytta/shareon/compare/v1.3.1...v1.4.0
[1.3.1]: https://github.com/kytta/shareon/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/kytta/shareon/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/kytta/shareon/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/kytta/shareon/compare/v1.1.5...v1.2.0
[1.1.5]: https://github.com/kytta/shareon/compare/v1.1.4...v1.1.5
[1.1.4]: https://github.com/kytta/shareon/compare/v1.1.3...v1.1.4
[1.1.3]: https://github.com/kytta/shareon/compare/v1.1.2...v1.1.3
[1.1.2]: https://github.com/kytta/shareon/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/kytta/shareon/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/kytta/shareon/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/kytta/shareon/compare/v1.0.0-beta.3...v1.0.0
[1.0.0-beta.3]: https://github.com/kytta/shareon/compare/v1.0.0-beta.2...v1.0.0-beta.3
[1.0.0-beta.2]: https://github.com/kytta/shareon/compare/v1.0.0-beta.1...v1.0.0-beta.2
[1.0.0-beta.1]: https://github.com/kytta/shareon/compare/3722ada1da60abb768e00621e66b269f8fa60689...v1.0.0-beta.1
