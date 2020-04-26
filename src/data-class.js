import { get } from 'lodash'
import processDataNode from './process-data-node'

export default function hydrateBindAttrs() {
	processDataNode(`class`, node => {
		let classVal = node.dataset.class
		let hasIf = classVal.indexOf(`?`) > -1
		let hasElse = classVal.indexOf(`:`) > -1
		let varName = classVal.split(`?`)[0].split(`:`)[0].trim()
		let isNegative = varName.indexOf(`!`) === 0
		let isTrue
		let isFalse

		if(isNegative){
			varName = varName.replace(`!`, ``)
		}
		if (hasIf){
			let statement = classVal.split(`?`).map(str => str.trim())
			isTrue = statement[1]
			if (hasElse){
				isTrue = isTrue.split(`:`)[0].trim()
			}
		}
		if (hasElse){
			let statement = classVal.split(`:`).map(str => str.trim())
			if(statement.length == 2){
				isFalse = statement[1]
			}
		}

		// If shorthand
		if(!isTrue && !isFalse){
			isTrue = varName
			isFalse = ``
		}

		// Change class on state change
		const handleStateChange = () => {
			let value = get(this.state, label)
			if (isNegative) {
				value = !value
			}
			if (value) {
				if (isTrue) {
					node.classList.add(isTrue)
				}
				if (isFalse) {
					node.classList.remove(isFalse)
				}
			}
			else {
				if (isFalse) {
					node.classList.add(isFalse)
				}
				if (isTrue) {
					node.classList.remove(isTrue)
				}
			}
		}

		let label = varName.split(`.`)[0]
		this.on(`onState:${label}`, handleStateChange)
		handleStateChange()
	})
}