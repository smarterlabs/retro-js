const globalState = {}
const events = {}

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

export function on(names, fn){
	if (!Array.isArray(names)) names = [names]
	for(let name of names){
		if(!(name in events)){
			events[name] = []
		}
		events[name].push(fn)
	}
}

export function emit(name, newState){
	if(name in events){
		events[name]({
			setState,
		})
	}
	setState(newState)
}

export function setState(newState){
	for(let i in newState){
		globalState[i] = newState[i]
	}
}

function noop() { }

