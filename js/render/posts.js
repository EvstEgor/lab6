import { getPosts } from '../api.js';
import { createElement } from '../utils/createElement.js';
import { renderBreadcrumbs } from '../components/breadcrumbs.js';
import { createSearchInput } from '../components/search.js';

export async function renderPosts() {
  const app = document.getElementById('app');
  const posts = await getPosts();

  const container = createElement('div');
  container.appendChild(renderBreadcrumbs());

  const search = createSearchInput(query => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(query) || post.body.toLowerCase().includes(query)
    );
    renderList(filtered);
  });
  container.appendChild(search);

  const list = createElement('ul');
  container.appendChild(list);

  function renderList(data) {
    list.innerHTML = '';
    data.forEach(post => {
      const li = createElement('li', {}, createElement('h4', {}, post.title), post.body);
      list.appendChild(li);
    });
  }

  renderList(posts);
  app.appendChild(container);
}
