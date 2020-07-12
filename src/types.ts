export type Network =
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

export interface PublishPreset {
  url: string,
  title: string,
  extra: {
    media: string,
    text: string,
    via: string,
  }
}
