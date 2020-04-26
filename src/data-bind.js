import { get, set } from 'lodash'
import processDataNode from './process-data-node'

export default function hydrateBindAttrs() {
	processDataNode(`bind`, node => {
		let { bind } = node.dataset
		let directives = bind.split(`:`)
		let [propertyPath, statePath, defaultValue, valueType] = directives
		let shouldSetDefault = typeof defaultValue == `string`
		let label = statePath.split(`.`)[0].split(`[`)[0]
		if (!propertyPath) propertyPath = `textContent`

		// Set default Value
		if (shouldSetDefault) {
			if (!defaultValue) defaultValue = node.textContent
			if (valueType == `number`) {
				defaultValue = Number(defaultValue)
			}
			else if (valueType == `json`) {
				defaultValue = JSON.parse(defaultValue)
			}
			this.setProperty(statePath, defaultValue)
		}

		// Set node property on state change
		this.on(`onState:${label}`, () => {
			let value = get(this.state, statePath)
			set(node, propertyPath, value)
		})
	})
}