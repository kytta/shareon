import "./shareon.css";

// prettier-ignore
/**
 * Map of social networks to their respective URL builders.
 *
 * The `d` argument of each builder is the object with the page metadata, such
 * as page title, URL, author name, etc.
 *
 * @type {{ [network: string]: (d: {
 *   url: string,
 *   title?: string,
 *   media?: string,
 *   text?: string,
 *   via?: string,
 *   fbAppId?: string
 * }) => string}}
 */
const urlBuilderMap = {
  facebook: (d) => `https://www.facebook.com/sharer/sharer.php?u=${d.url}`,
  linkedin: (d) => `https://www.linkedin.com/sharing/share-offsite/?url=${d.url}`,
  mastodon: (d) => `https://toot.kytta.dev/?text=${d.title}%0D%0A${d.url}${d.text ? `%0D%0A%0D%0A${d.text}` : ''}${d.via ? `%0D%0A%0D%0A${d.via}` : ''}`,
  messenger: (d) => `https://www.facebook.com/dialog/send?app_id=${d.fbAppId}&link=${d.url}&redirect_uri=${d.url}`,
  odnoklassniki: (d) => `https://connect.ok.ru/offer?url=${d.url}&title=${d.title}${d.media ? `&imageUrl=${d.media}` : ''}`,
  pinterest: (d) => `https://pinterest.com/pin/create/button/?url=${d.url}&description=${d.title}${d.media ? `&media=${d.media}` : ''}`,
  pocket: (d) => `https://getpocket.com/edit.php?url=${d.url}`,
  reddit: (d) => `https://www.reddit.com/submit?title=${d.title}&url=${d.url}`,
  telegram: (d) => `https://telegram.me/share/url?url=${d.url}${d.text ? `&text=${d.text}` : ''}`,
  twitter: (d) => `https://twitter.com/intent/tweet?url=${d.url}&text=${d.title}${d.via ? `&via=${d.via}` : ''}`,
  viber: (d) => `viber://forward?text=${d.title}%0D%0A${d.url}${d.text ? `%0D%0A%0D%0A${d.text}` : ''}`,
  vkontakte: (d) => `https://vk.com/share.php?url=${d.url}&title=${d.title}${d.media ? `&image=${d.media}` : ''}`,
  whatsapp: (d) => `https://wa.me/?text=${d.title}%0D%0A${d.url}${d.text ? `%0D%0A%0D%0A${d.text}` : ''}`,
};

const openUrl = (buttonUrl) => () => {
  window.open(buttonUrl, "_blank", "noopener,noreferrer");
};

const init = () => {
  const shareonContainers = document.querySelectorAll(".shareon");

  // iterate over <div class="shareon">
  for (const container of shareonContainers) {
    // iterate over children of <div class="shareon">
    for (const child of container.children) {
      if (child) {
        const classListLength = child.classList.length;

        // iterate over classes of the child element
        for (let k = 0; k < classListLength; k += 1) {
          const cls = child.classList.item(k);

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
          }

          // if it's one of the networks
          if (Object.prototype.hasOwnProperty.call(urlBuilderMap, cls)) {
            const preset = {
              url: encodeURIComponent(
                child.dataset.url ||
                  container.dataset.url ||
                  window.location.href
              ),
              title: encodeURIComponent(
                child.dataset.title || container.dataset.title || document.title
              ),
              media: encodeURIComponent(
                child.dataset.media || container.dataset.media || ""
              ),
              text: encodeURIComponent(
                child.dataset.text || container.dataset.text || ""
              ),
              via: encodeURIComponent(
                child.dataset.via || container.dataset.via || ""
              ),
              fbAppId: encodeURIComponent(
                child.dataset.fbAppId || container.dataset.fbAppId || ""
              ),
            };
            const url = urlBuilderMap[cls](preset);

            if (child.tagName.toLowerCase() === "a") {
              child.setAttribute("href", url);
              child.setAttribute("rel", "noopener noreferrer");
              child.setAttribute("target", "_blank");
            } else {
              child.addEventListener("click", openUrl(url));
            }

            break; // once a network is detected we don't want to check further
          }
        }
      }
    }
  }
};

export { init };
