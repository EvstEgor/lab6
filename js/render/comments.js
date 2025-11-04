import { getComments } from '../api.js';
import { createElement } from '../utils/createElement.js';
import { renderBreadcrumbs } from '../components/breadcrumbs.js';
import { createSearchInput } from '../components/search.js';

export async function renderComments() {
  const app = document.getElementById('app');
  const comments = await getComments();

  const container = createElement('div');
  container.appendChild(renderBreadcrumbs());

  const search = createSearchInput(query => {
    const filtered = comments.filter(comment =>
      comment.name.toLowerCase().includes(query) || comment.body.toLowerCase().includes(query)
    );
    renderList(filtered);
  });
  container.appendChild(search);

  const list = createElement('ul');
  container.appendChild(list);

  function renderList(data) {
    list.innerHTML = '';
    data.forEach(comment => {
      const li = createElement('li', {}, createElement('strong', {}, comment.name), ` — ${comment.body}`);
      list.appendChild(li);
    });
  }

  renderList(comments);
  app.appendChild(container);
}
