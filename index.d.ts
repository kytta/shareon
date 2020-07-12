interface PublishPreset {
  url: string;
  title: string;
  extra: {
    media: string;
    text: string;
    via: string;
  };
}

type Network =
  'facebook' |
  'linkedin' |
  'messenger' |
  'odnoklassniki' |
  'pinterest' |
  'pocket' |
  'reddit' |
  'telegram' |
  'twitter' |
  'viber' |
  'vkontakte' |
  'whatsapp';

export function shareUrl(network: Network, preset?: PublishPreset): string | void;
export function render(container: HTMLElement): HTMLElement;
