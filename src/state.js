import { set } from 'lodash'

export function setState(newState) {
	for (let label in newState) {
		this.state[label] = newState[label]
	}
	for (let label in newState) {
		this.emit(`onState:${label}`)
	}
	this.emit(`onState`)
}

export function setProperty(propPath, value) {
	let label = propPath.split(`.`)[0].split(`[`)[0]
	set(this.state, propPath, value)
	this.emit(`onState:${label}`)
	this.emit(`onState`)
}