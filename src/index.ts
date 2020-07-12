import './style.scss';

interface PublishPreset {
  url: string,
  title: string,
  extra: {
    media: string,
    text: string,
    via: string,
  }
}

type UrlBuilder = (data: PublishPreset) => string;

function hasProp(obj: Record<string, unknown>, prop: unknown): boolean {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function createUrl(baseUrl: string, params: Record<string, unknown>): string {
  const url = new URL(baseUrl);
  Object.keys(params).forEach((name) => {
    const value = String(params[name] ?? '');
    if (value) url.searchParams.append(name, value);
  });
  return url.href;
}

function createMessage({ title, url, extra }: PublishPreset): string {
  const sep = '\r\n';
  return [
    title,
    url,
    extra.text && `${sep}extra.text`,
  ].filter(Boolean).join(sep);
}

const NETWORKS: { [name: string]: UrlBuilder } = {
  facebook: (d) => createUrl('https://www.facebook.com/sharer/sharer.php', { u: d.url }),
  linkedin: (d) => createUrl('https://www.linkedin.com/shareArticle', { mini: true, url: d.url, title: d.title }),
  messenger: (d) => createUrl('https://www.facebook.com/dialog/send', { app_id: 3619024578167617, link: d.url, redirect_uri: d.url }),
  odnoklassniki: (d) => createUrl('https://connect.ok.ru/offer', { url: d.url, title: d.title, imageUrl: d.extra.media }),
  pinterest: (d) => createUrl('https://pinterest.com/pin/create/button', { url: d.url, description: d.title, media: d.extra.media }),
  pocket: (d) => createUrl('https://getpocket.com/edit.php', { url: d.url }),
  reddit: (d) => createUrl('https://www.reddit.com/submit', { title: d.title, url: d.url }),
  telegram: (d) => createUrl('https://telegram.me/share/url', { url: d.url, text: d.extra.text }),
  twitter: (d) => createUrl('https://twitter.com/intent/tweet', { url: d.url, text: d.title, via: d.extra.via }),
  viber: (d) => createUrl('viber://forward', { text: createMessage(d) }),
  vkontakte: (d) => createUrl('https://vk.com/share.php', { url: d.url, title: d.title, image: d.extra.media }),
  whatsapp: (d) => createUrl('whatsapp://send', { text: createMessage(d) }),
};

function initShareonChild(child: HTMLElement, preset: PublishPreset) {
  child.classList.forEach((cls) => {
    if (!hasProp(NETWORKS, cls)) return;

    const url = NETWORKS[cls](preset);
    if (child.tagName.toLowerCase() === 'a') {
      child.setAttribute('href', url);
      child.setAttribute('rel', 'noopener noreferrer');
      child.setAttribute('target', '_blank');
    } else {
      child.addEventListener('click', () => { window.open(url, '_blank', 'noopener,noreferrer').opener = null; });
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const shareonContainers = document.getElementsByClassName('shareon');

  for (let i = 0; i < shareonContainers.length; i += 1) {
    const container = shareonContainers[i] as HTMLElement;

    for (let j = 0; j < container.children.length; j += 1) {
      const child = container.children[j] as HTMLElement;

      const preset: PublishPreset = {
        url: child.dataset.url || container.dataset.url || window.location.href,
        title: child.dataset.title || container.dataset.title || document.title,
        extra: {
          media: child.dataset.media || container.dataset.media,
          text: child.dataset.text || container.dataset.text,
          via: child.dataset.via || container.dataset.via,
        },
      };

      initShareonChild(child, preset);
    }
  }
});
