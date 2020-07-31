import urlBuilderMap from './networks';

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
          if (Object.prototype.hasOwnProperty.call(urlBuilderMap, cls)) {
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
            const url = urlBuilderMap[cls](preset);

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
