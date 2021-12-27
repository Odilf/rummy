import Swipe from 'swipejs';

export function swipe(node: HTMLElement, callback) {
	function handleTouchstart(e: TouchEvent) {
		console.log(e);
		
	}

	function handleTouchmove(e: TouchEvent) {
		e.preventDefault()
		console.log(e);
		
	}

	node.addEventListener('touchstart', handleTouchstart)
	node.addEventListener('touchmove', handleTouchmove,  { passive: true })

	return {
		destroy() {
			node.removeEventListener('touchstart', handleTouchstart)
			node.removeEventListener('touchmove', handleTouchmove, true)
		}
	}
}