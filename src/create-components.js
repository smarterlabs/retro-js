import Component from './component'

export default function createComponents(componentConfig) {
	for (let selector in componentConfig) {
		const config = {
			selector,
			...componentConfig[selector],
		}
		this.components[selector] = new Component(this, config)
	}
}