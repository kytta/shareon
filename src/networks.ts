import { Network, PublishPreset } from './types';

type UrlBuilder = (data: PublishPreset) => string;

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

const NETWORKS: { [N in Network]: UrlBuilder } = {
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

export const networks = Object.keys(NETWORKS) as Network[];

export function shareUrl(network: Network, preset?: PublishPreset): string | void {
  if (networks.includes(network)) {
    return NETWORKS[network](preset);
  }
  return undefined;
}
