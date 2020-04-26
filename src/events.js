export function on(label, fn){
	if(!(label in this.events)){
		this.events[label] = []
	}
	this.events[label].push(fn)
}
export function emit(label){
	if(label in this.events){
		for(let fn of this.events[label]){
			fn()
		}
	}
}