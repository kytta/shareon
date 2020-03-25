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

const NETWORKS: { [name: string]: UrlBuilder } = {
  telegram: (d) => `https://telegram.me/share/url?url=${d.url}${d.extra.text ? `&text=${d.extra.text}` : ''}`,
  twitter: (d) => `https://twitter.com/intent/tweet?url=${d.url}&text=${d.title}${d.extra.via ? `&via=${d.extra.via}` : ''}`,
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
        url: encodeURIComponent(child.dataset.url || container.dataset.url || window.location.href),
        title: encodeURIComponent(child.dataset.title || container.dataset.title || document.title || ''),
        extra: {
          media: encodeURIComponent(child.dataset.media || container.dataset.media || ''),
          text: encodeURIComponent(child.dataset.text || container.dataset.text || ''),
          via: encodeURIComponent(child.dataset.via || container.dataset.via || ''),
        },
      };

      initShareonChild(
        child as HTMLElement,
        preset,
      );
    }
  }
};
