import createComponents from './create-components'
import { setState, setProperty } from './state'
import { on, emit } from './events'
import hydrateDataSet from './data-set'
import hydrateDataBind from './data-bind'
import hydrateDataClick from './data-click'
import hydrateDataClass from './data-class'

export default class RetroApp{
	constructor(){
		this.components = {}
		this.state = {}
		this.events = {}

		this.createComponents = createComponents.bind(this)
		this.setState = setState.bind(this)
		this.setProperty = setProperty.bind(this)
		this.on = on.bind(this)
		this.emit = emit.bind(this)
		this.mount = mount.bind(this)

		this.apiArguments = {
			state: this.state,
			setState: this.setState,
		}
	}
}

function mount(){
	for(let i in this.components){
		this.components[i].mount()
	}

	hydrateDataSet.bind(this)()
	hydrateDataBind.bind(this)()
	hydrateDataClick.bind(this)()
	hydrateDataClass.bind(this)()

}