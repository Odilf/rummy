export function swipe(node: HTMLElement, callback) {
	console.warn('NOT IMPLEMENTED');
	alert("SWPIPING ISNT IMPLEMENTED, DUNCE")
	
	function handleTouchstart(e: TouchEvent) {
		console.log(e);
		
	}

	function handleTouchmove(e: TouchEvent) {
		e.preventDefault()
		console.log(e);
		
	}

	node.addEventListener('touchstart', handleTouchstart)
	node.addEventListener('touchmove', handleTouchmove)

	return {
		destroy() {
			node.removeEventListener('touchstart', handleTouchstart)
			node.removeEventListener('touchmove', handleTouchmove)
		}
	}
}