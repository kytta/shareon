/**
 * @typedef {
 *   "facebook"
 *   | "linkedin"
 *   | "mastodon"
 *   | "messenger"
 *   | "odnoklassniki"
 *   | "pinterest"
 *   | "pocket"
 *   | "reddit"
 *   | "telegram"
 *   | "twitter"
 *   | "viber"
 *   | "vkontakte"
 *   | "whatsapp"
 * } SocialNetworkName
 * All supported social networks
 */

/**
 * @typedef {Object} PublicationData
 * Object that encapsulates data to be included in the post
 *
 * @property {string} url - URL of the shared page
 * @property {string} [title] - Title of the shared page
 * @property {string} [media] - URL of media to be attached to the publication
 * @property {string} [text] - Text to be attached to the publication
 * @property {string} [via] - User to be mentioned in the publication
 * @property {string} [fbAppId] - Facebook App ID to use with Messenger
 */

/**
 * @callback UrlBuilder
 * Function that builds a share URL with provided data
 *
 * @param {PublicationData} data - data to be published
 * @return {string} - built URL
 */

/**
 * Mapping of the social network names to their url builder function
 *
 * @type {Record<SocialNetworkName, UrlBuilder>}
 */
const urlBuilderMap = {
  facebook: (d) => `https://www.facebook.com/sharer/sharer.php?u=${d.url}`,
  linkedin: (d) => `https://www.linkedin.com/shareArticle?mini=true&url=${d.url}&title=${d.title || ''}`,
  mastodon: (d) => `https://toot.karamoff.dev/?text=${d.title}%0D%0A${d.url}${d.text ? `%0D%0A%0D%0A${d.text}` : ''}${d.via ? `%0D%0A%0D%0A${d.via}` : ''}`,
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

export default urlBuilderMap;
