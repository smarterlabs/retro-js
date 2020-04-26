import { get } from 'lodash'
import processDataNode from './process-data-node'

export default function hydrateBindAttrs() {
	processDataNode(`click`, node => {
		let clickVal = node.dataset.click
		let isToggle = clickVal.indexOf(`!`) == 0
		if(isToggle) clickVal = clickVal.replace(`!`, ``)
		let [property, setTo, type] = clickVal.split(`:`).map(str => str.trim())
		if(!type && setTo && isToggle) type = `boolean`

		if(setTo && type){
			if(type == `boolean`){
				setTo = setTo == `true` ? true : false
			}
			else if(type == `number`){
				setTo = Number(setTo)
			}
		}

		if (setTo && isToggle) {
			this.setProperty(property, setTo)
			setTo = false
		}
		let clickHandler
		if(isToggle){
			clickHandler = () => {
				this.setProperty(property, !get(this.state, property))
			}
		}
		if (setTo){
			clickHandler = () => {
				this.setProperty(property, setTo)
			}
		}
		node.addEventListener(`click`, clickHandler)
	})
}