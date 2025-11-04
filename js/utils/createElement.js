export function createElement(tag, attrs = {}, ...children) {
	const el = document.createElement(tag)
	Object.entries(attrs).forEach(([key, value]) => {
		if (key.startsWith('on')) {
			el.addEventListener(key.slice(2).toLowerCase(), value)
		} else {
			el.setAttribute(key, value)
		}
	})
	children.forEach(child => {
		if (typeof child === 'string') {
			el.appendChild(document.createTextNode(child))
		} else if (child instanceof Node) {
			el.appendChild(child)
		}
	})
	return el
}
