import { createElement } from '../utils/createElement.js'

export function renderBreadcrumbs() {
	const hashParts = location.hash.split('#').filter(Boolean)
	const nav = createElement('nav', { class: 'breadcrumbs' })

	let path = ''
	hashParts.forEach((part, index) => {
		path += `#${part}`
		const link = createElement('a', { href: path }, part)
		nav.appendChild(link)
		if (index < hashParts.length - 1) {
			nav.appendChild(document.createTextNode(' › '))
		}
	})

	return nav
}
