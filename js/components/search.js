import { createElement } from '../utils/createElement.js';

export function createSearchInput(onSearch) {
  let timeout;
  const input = createElement('input', {
    placeholder: 'Поиск...',
    oninput: e => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onSearch(e.target.value.trim().toLowerCase());
      }, 300);
    }
  });
  return input;
}
