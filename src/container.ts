import { Network, PublishPreset } from './types';
import { networks, shareUrl } from './networks';

function renderChild(child: HTMLElement, preset: PublishPreset) {
  const network = (Array.from(child.classList) as Network[])
    .reverse()
    .find((cls) => networks.includes(cls));
  if (!network) return;

  const url = shareUrl(network, preset);
  if (!url) return;

  if (child.tagName.toLowerCase() === 'a') {
    child.setAttribute('href', url);
    child.setAttribute('rel', 'noopener noreferrer');
    child.setAttribute('target', '_blank');
  } else {
    child.addEventListener('click', () => { window.open(url, '_blank', 'noopener,noreferrer').opener = null; });
  }
}

export function render(container: HTMLElement): HTMLElement {
  for (let i = 0; i < container.children.length; i += 1) {
    const child = container.children[i] as HTMLElement;

    const preset: PublishPreset = {
      url: child.dataset.url || container.dataset.url || window.location.href,
      title: child.dataset.title || container.dataset.title || document.title,
      extra: {
        media: child.dataset.media || container.dataset.media,
        text: child.dataset.text || container.dataset.text,
        via: child.dataset.via || container.dataset.via,
      },
    };

    renderChild(child, preset);
  }

  return container;
}

export { shareUrl };
