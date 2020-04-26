export default function processDataNode(id, fn){
	const nodes = document.querySelectorAll(`[data-${id}]`)
	const mountedFlag = `${id}Mounted`
	nodes.forEach(node => {
		// Skip if already mounted
		if (node.dataset[mountedFlag]) return

		fn(node)

		// Set data attribute on element to skip on remount
		node.dataset[mountedFlag] = true
	})
}