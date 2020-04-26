export default class RetroComponent{
	constructor(app, config){
		this.app = app
		this.config = config
		this.state = {}
		this.mount = mount.bind(this)
		this.attachEvents = attachEvents.bind(this)
	}
}


function mount() {
	let {
		selector,
		onMount,
		...events
	} = this.config

	this.nodes = document.querySelectorAll(selector)
	this.nodes.forEach(node => {
		// Skip if already mounted
		if (node.dataset.componentMounted) return

		const args = { ...this.app.apiArguments, node }

		// Attach events to element
		this.attachEvents(node, events, args)

		// Subscribe to state changes
		for(let label in events){
			if (label.indexOf(`onState:`) == 0) {
				let fn = events[label]
				this.app.on(label, () => {
					fn({ ...args })
				})
				delete events[label]
			}
		}

		// Call onMount event
		if (onMount) onMount(args)

		// Set data attribute on element to skip on remount
		node.dataset.componentMounted = true

	})
}

function attachEvents(node, events, args) {
	for (let name in events) {
		let fn = events[name]
		if (name.indexOf(`on`) == 0) {
			name = name.replace(`on`, ``).toLowerCase()
			node.addEventListener(name, event => {
				fn({
					...args,
					event,
				})
			})
		}
	}
}