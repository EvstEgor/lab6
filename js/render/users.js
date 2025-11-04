import { getUsers } from '../api.js'
import { createElement } from '../utils/createElement.js'
import { renderBreadcrumbs } from '../components/breadcrumbs.js'
import { createSearchInput } from '../components/search.js'

export async function renderUsers() {
	const app = document.getElementById('app')
	const apiUsers = await getUsers()
	const localUsers = JSON.parse(localStorage.getItem('users')) || []
	const users = [...apiUsers, ...localUsers]

	const container = createElement('div')
	container.appendChild(renderBreadcrumbs())

	const search = createSearchInput(query => {
		const filtered = users.filter(
			u =>
				u.name.toLowerCase().includes(query) ||
				u.email.toLowerCase().includes(query)
		)
		renderList(filtered)
	})
	container.appendChild(search)

	const form = createElement(
		'form',
		{
			onsubmit: e => {
				e.preventDefault()
				const name = e.target.name.value.trim()
				const email = e.target.email.value.trim()
				if (!name || !email) return

				const newUser = { id: Date.now(), name, email }
				localUsers.push(newUser)
				localStorage.setItem('users', JSON.stringify(localUsers))
				renderList([...apiUsers, ...localUsers])
				e.target.reset()
			},
		},
		createElement('input', { name: 'name', placeholder: 'Имя' }),
		createElement('input', { name: 'email', placeholder: 'Email' }),
		createElement('button', { type: 'submit' }, 'Добавить')
	)
	container.appendChild(form)

	const list = createElement('ul')
	container.appendChild(list)

	function renderList(data) {
		list.innerHTML = ''
		data.forEach(user => {
			const li = createElement('li', {}, `${user.name} (${user.email})`)
			if (localUsers.find(u => u.id === user.id)) {
				const delBtn = createElement(
					'button',
					{
						onclick: () => {
							const updated = localUsers.filter(u => u.id !== user.id)
							localStorage.setItem('users', JSON.stringify(updated))
							renderList([...apiUsers, ...updated])
						},
					},
					'Удалить'
				)
				li.appendChild(delBtn)
			}
			list.appendChild(li)
		})
	}

	renderList(users)
	app.appendChild(container)
}
