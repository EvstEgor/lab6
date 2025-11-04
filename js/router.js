import { renderUsers } from './render/users.js'
import { renderTodos } from './render/todos.js'
import { renderPosts } from './render/posts.js'
import { renderComments } from './render/comments.js'

export function router() {
	const app = document.getElementById('app')
	app.innerHTML = ''

	const hash = location.hash

	if (hash === '#users') renderUsers()
	else if (hash === '#users#todos') renderTodos()
	else if (hash === '#users#posts') renderPosts()
	else if (hash === '#users#posts#comments') renderComments()
	else app.innerHTML = '<h2>Выберите раздел</h2>'
}
