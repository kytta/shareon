interface PublishPreset {
  url: string,
  title: string,
  media: string,
  text: string,
  via: string,
}

type UrlBuilder = (data: PublishPreset) => string;

const NETWORKS: { [name: string]: UrlBuilder } = {
  facebook: (d) => `https://www.facebook.com/sharer/sharer.php?u=${d.url}`,
  linkedin: (d) => `https://www.linkedin.com/shareArticle?mini=true&url=${d.url}&title=${d.title}`,
  messenger: (d) => `https://www.facebook.com/dialog/send?app_id=3619024578167617&link=${d.url}&redirect_uri=${d.url}`,
  odnoklassniki: (d) => `https://connect.ok.ru/offer?url=${d.url}&title=${d.title}${d.media ? `&imageUrl=${d.media}` : ''}`,
  pinterest: (d) => `https://pinterest.com/pin/create/button/?url=${d.url}&description=${d.title}${d.media ? `&media=${d.media}` : ''}`,
  pocket: (d) => `https://getpocket.com/edit.php?url=${d.url}`,
  reddit: (d) => `https://www.reddit.com/submit?title=${d.title}&url=${d.url}`,
  telegram: (d) => `https://telegram.me/share/url?url=${d.url}${d.text ? `&text=${d.text}` : ''}`,
  twitter: (d) => `https://twitter.com/intent/tweet?url=${d.url}&text=${d.title}${d.via ? `&via=${d.via}` : ''}`,
  viber: (d) => `viber://forward?text=${d.title}%0D%0A${d.url}${d.text ? `%0D%0A%0D%0A${d.text}` : ''}`,
  vkontakte: (d) => `https://vk.com/share.php?url=${d.url}&title=${d.title}${d.media ? `&image=${d.media}` : ''}`,
  whatsapp: (d) => `whatsapp://send?text=${d.title}%0D%0A${d.url}${d.text ? `%0D%0A%0D%0A${d.text}` : ''}`,
};

const initializeShareon = () : void => {
  const shareonContainers = document.getElementsByClassName('shareon');

  // iterate over <div class="shareon">
  for (let i = 0; i < shareonContainers.length; i += 1) {
    const container = shareonContainers[i] as HTMLElement;

    // iterate over children of <div class="shareon">
    for (let j = 0; j < container.children.length; j += 1) {
      const child = container.children[j] as HTMLElement;

      if (child) {
        const classListLength = child.classList.length;

        // iterate over classes of the child element
        for (let k = 0; k < classListLength; k += 1) {
          const cls = child.classList.item(k);

          // if it's one of the networks
          if (Object.prototype.hasOwnProperty.call(NETWORKS, cls)) {
            const preset = {
              url: encodeURIComponent(
                child.dataset.url
                  || container.dataset.url
                  || window.location.href,
              ),
              title: encodeURIComponent(
                child.dataset.title
                  || container.dataset.title
                  || document.title,
              ),
              media: encodeURIComponent(
                child.dataset.media
                  || container.dataset.media
                  || '',
              ),
              text: encodeURIComponent(
                child.dataset.text
                  || container.dataset.text
                  || '',
              ),
              via: encodeURIComponent(
                child.dataset.via
                  || container.dataset.via
                  || '',
              ),
            };
            const url = NETWORKS[cls](preset);

            if (child.tagName.toLowerCase() === 'a') {
              child.setAttribute('href', url);
              child.setAttribute('rel', 'noopener noreferrer');
              child.setAttribute('target', '_blank');
            } else {
              child.addEventListener('click', () => {
                window.open(url, '_blank', 'noopener,noreferrer').opener = null;
              });
            }

            break; // once a network is detected we don't want to check further
          }
        }
      }
    }
  }
};

export default initializeShareon;
