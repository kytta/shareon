import './style.scss';
import { render as renderContainer } from './container';

window.addEventListener('DOMContentLoaded', () => {
  const shareonContainers = document.getElementsByClassName('shareon');

  for (let i = 0; i < shareonContainers.length; i += 1) {
    const container = shareonContainers[i] as HTMLElement;
    renderContainer(container);
  }
});
