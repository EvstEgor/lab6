import { getTodos } from '../api.js';
import { createElement } from '../utils/createElement.js';
import { renderBreadcrumbs } from '../components/breadcrumbs.js';
import { createSearchInput } from '../components/search.js';

export async function renderTodos() {
  const app = document.getElementById('app');
  const apiTodos = await getTodos();
  const localTodos = JSON.parse(localStorage.getItem('todos')) || [];
  const todos = [...apiTodos, ...localTodos];

  const container = createElement('div');
  container.appendChild(renderBreadcrumbs());

  const search = createSearchInput(query => {
    const filtered = todos.filter(todo =>
      todo.title.toLowerCase().includes(query)
    );
    renderList(filtered);
  });
  container.appendChild(search);

  const form = createElement('form', {
    onsubmit: e => {
      e.preventDefault();
      const title = e.target.title.value.trim();
      if (!title) return;

      const newTodo = {
        id: Date.now(),
        title,
        completed: false,
        userId: 0
      };
      localTodos.push(newTodo);
      localStorage.setItem('todos', JSON.stringify(localTodos));
      renderList([...apiTodos, ...localTodos]);
      e.target.reset();
    }
  },
    createElement('input', { name: 'title', placeholder: 'Новая задача' }),
    createElement('button', { type: 'submit' }, 'Добавить')
  );
  container.appendChild(form);

  const list = createElement('ul');
  container.appendChild(list);

  function renderList(data) {
    list.innerHTML = '';
    data.forEach(todo => {
      const li = createElement('li', {}, `${todo.title} ${todo.completed ? '✅' : ''}`);
      list.appendChild(li);
    });
  }

  renderList(todos);
  app.appendChild(container);
}
