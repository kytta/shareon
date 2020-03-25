import './style.scss';

interface PublishPreset {
  url: string,
  title: string,
  extra?: {
    media?: null|string,
    text?: null|string,
    via?: null|string,
  }
}

type UrlBuilder = (data: PublishPreset) => string;

const NETWORKS: { [name: string]: UrlBuilder } = {
  telegram: (d) => `https://telegram.me/share/url?url=${encodeURIComponent(d.url)}${(d.extra && d.extra.text) ? `&text=${encodeURIComponent(d.extra.text)}` : ''}`,
  twitter: (d) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(d.url)}&text=${encodeURIComponent(d.title)}${(d.extra && d.extra.via) ? `&via=${encodeURIComponent(d.extra.via)}` : ''}`,
};

function initShareonChild(child: HTMLElement, preset: PublishPreset) {
  if (child) {
    child.classList.forEach((cls) => {
      if (Object.prototype.hasOwnProperty.call(NETWORKS, cls)) {
        const url = NETWORKS[cls](preset);
        if (child.tagName.toLowerCase() === 'a') {
          child.setAttribute('href', url);
          child.setAttribute('rel', 'noopener noreferrer');
          child.setAttribute('target', '_blank');
        } else {
          child.addEventListener('click', () => { window.open(url, '_blank', 'noopener,noreferrer').opener = null; });
        }
      }
    });
  }
}

window.onload = () => {
  const shareonContainers = document.getElementsByClassName('shareon');

  for (let i = 0; i < shareonContainers.length; i += 1) {
    const container = shareonContainers[i] as HTMLElement;

    for (let j = 0; j < container.children.length; j += 1) {
      const child = container.children[j] as HTMLElement;

      const preset: PublishPreset = {
        url: child.dataset.url || container.dataset.url || window.location.href,
        title: child.dataset.title || container.dataset.title || document.title || '',
        extra: {
          media: child.dataset.media || container.dataset.media || null,
          text: child.dataset.text || container.dataset.text || null,
          via: child.dataset.via || container.dataset.via || null,
        },
      };

      initShareonChild(
        child as HTMLElement,
        preset,
      );
    }
  }
};
