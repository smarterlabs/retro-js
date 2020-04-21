const defaultComponentProps = {
	onMount: noop,
}

export function components(components){
	for(let selector in components){
		let {
			onMount,
			onStateChange,
			...events,
		} = {
			...defaultComponentProps
			...components[selector]
		}

		// Find nodes and attach events
		let nodes = document.querySelectorAll(selector)
		nodes.forEach(node => {
			// Call onMount event
			onMount({ node })
			for(let name in events){
				let fn = events[name]
				if (name.indexOf(`on`) == 0){
					name = event.replace(`on`, ``).toLowerCase()
					node.addEventListener(name, event => {
						fn({
							event,
							node,
						})
					})
				}
			}
		})


	}
}

function noop(){}