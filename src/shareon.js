/**
 * @typedef PublishPreset
 *
 * @property {string} url
 * @property {string} [title]
 * @property {string} [media]
 * @property {string} [text]
 * @property {string} [via]
 * @property {string} [hashtags]
 * @property {string} [fbAppId]
 * @property {string} [s2fInstance]
 */

/**
 * Creates a URL that a button will point to.
 *
 * @param  {string} baseUrl [description]
 * @param  {Record<string, string | undefined>} parameters  [description]
 * @return {string}         [description]
 */
const buildUrl = (baseUrl, parameters) => {
  const url = new URL(baseUrl);
  for (const [parameter, value] of Object.entries(parameters)) {
    if (value) {
      url.searchParams.append(parameter, value);
    }
  }

  return url.href;
};

/**
 * Map of social networks to their respective URL builders.
 *
 * The `d` argument of each builder is the object with the page metadata, such
 * as page title, URL, author name, etc.
 *
 * @type {{ [network: string]: (d: PublishPreset) => URL}}
 */
const urlBuilderMap = {
  facebook: (d) =>
    buildUrl("https://www.facebook.com/sharer/sharer.php", {
      u: d.url,
      hashtag: d.hashtags?.split(",")[0],
    }),
  fediverse: (d) =>
    buildUrl(`https://${d.s2fInstance}`, {
      text: [d.title, d.url, d.via].filter(Boolean).join("\n\n"),
    }),
  email: (d) =>
    buildUrl("mailto:", {
      subject: d.title,
      body: d.url,
    }),
  linkedin: (d) =>
    buildUrl("https://www.linkedin.com/sharing/share-offsite", {
      url: d.url,
    }),
  mastodon: (d) =>
    buildUrl(`https://${d.s2fInstance}`, {
      text: [d.title, d.url, d.via].filter(Boolean).join("\n\n"),
    }),
  messenger: (d) =>
    buildUrl(`https://www.facebook.com/dialog/send`, {
      app_id: d.fbAppId,
      link: d.url,
      redirect_uri: d.url,
    }),
  odnoklassniki: (d) =>
    buildUrl("https://connect.ok.ru/offer", {
      url: d.url,
      title: d.title,
      imageUrl: d.media,
    }),
  pinterest: (d) =>
    buildUrl("https://pinterest.com/pin/create/button", {
      url: d.url,
      description: d.title,
      media: d.media,
    }),
  pocket: (d) =>
    buildUrl("https://getpocket.com/edit.php", {
      url: d.url,
    }),
  reddit: (d) =>
    buildUrl("https://www.reddit.com/submit", {
      title: d.title,
      url: d.url,
    }),
  teams: (d) =>
    buildUrl("https://teams.microsoft.com/share", {
      href: d.url,
      msgText: d.text,
    }),
  telegram: (d) =>
    buildUrl("https://telegram.me/share/url", {
      url: d.url,
      text: d.text,
    }),
  tumblr: (d) =>
    buildUrl("https://www.tumblr.com/widgets/share/tool", {
      posttype: "link",
      tags: d.hashtags,
      title: d.title,
      content: d.url,
      canonicalUrl: d.url,
      caption: d.text,
      "show-via": d.via,
    }),
  twitter: (d) =>
    buildUrl("https://twitter.com/intent/tweet", {
      url: d.url,
      text: d.title,
      via: d.via,
      hashtags: d.hashtags,
    }),
  viber: (d) =>
    buildUrl("viber://forward", {
      text: [d.title, d.url, d.text].filter(Boolean).join("\n\n"),
    }),
  vkontakte: (d) =>
    buildUrl("https://vk.com/share.php", {
      url: d.url,
      title: d.title,
      image: d.media,
    }),
  whatsapp: (d) =>
    buildUrl("https://wa.me", {
      text: [d.title, d.url, d.text].filter(Boolean).join("\n\n"),
    }),
};

const init = () => {
  // iterate over <div class="shareon">
  for (const container of document.querySelectorAll(".shareon")) {
    // iterate over children of <div class="shareon">
    for (const child of container.children) {
      if (!child) continue;

      // iterate over classes of the child element
      for (const cls of child.classList) {
        // if it's "Copy URL"
        if (cls === "copy-url") {
          child.addEventListener("click", () => {
            const url =
              child.dataset.url ||
              container.dataset.url ||
              window.location.href;
            navigator.clipboard.writeText(url);
            child.classList.add("done");
            setTimeout(() => {
              child.classList.remove("done");
            }, 1000);
          });
          break;
        }

        // if it's "Print"
        if (cls === "print") {
          child.addEventListener("click", () => {
            window.print();
          });
          break;
        }

        // if it's "Web Share"
        if (cls === "web-share") {
          const data = {
            title:
              child.dataset.title || container.dataset.title || document.title,
            text: child.dataset.text || container.dataset.text || "",
            url:
              child.dataset.url ||
              container.dataset.url ||
              window.location.href,
          };

          if (navigator.canShare?.(data)) {
            child.addEventListener("click", () => {
              navigator.share(data);
            });
          } else {
            child.style.display = "none";
          }
        }

        // if it's one of the networks
        if (Object.prototype.hasOwnProperty.call(urlBuilderMap, cls)) {
          const url = urlBuilderMap[cls]({
            url: window.location.href,
            title: document.title,
            s2fInstance: "s2f.kytta.dev",
            ...container.dataset,
            ...child.dataset,
          });

          if (child.tagName.toLowerCase() === "a") {
            child.setAttribute("href", url);
            child.setAttribute("rel", "noopener noreferrer");
            child.setAttribute("target", "_blank");
          } else {
            child.addEventListener("click", () => {
              window.open(url, "_blank", "noopener,noreferrer");
            });
          }
          break; // once a network is detected we don't want to check further
        }
      }
    }
  }
};

export { init };
