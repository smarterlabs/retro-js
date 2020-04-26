import processDataNode from './process-data-node'

export default function hydrateBindAttrs() {
	processDataNode(`set`, node => {
		let setVal = node.dataset.set
		let [property, setTo, type] = setVal.split(`:`).map(str => str.trim())
		if(!setTo && !type){
			if(setVal.indexOf(`!` == 0)){
				setVal = setVal.replace(`!`, ``)
				setTo = false
			}
			else{
				setTo = true
			}
		}
		if(type == `number`){
			setTo = Number(setTo)
		}
		else if(type == `boolean`){
			setTo = (setTo == `true`) ? true : false
		}
		this.setProperty(property, setTo)
	})
}