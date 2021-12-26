import { browser } from "$app/env"

if (browser) {
	document.addEventListener('mousemove', handleMousemove)
	document.addEventListener('mouseup', deselect)

	document.addEventListener('touchmove', handleTouchmove)
	document.addEventListener('touchend', deselect)
}

export function draggable(node: HTMLElement) {
	function selector (e: MouseEvent | TouchEvent) { select(e.currentTarget as HTMLElement, pointerCoordinates(e)) }

	node.addEventListener('mousedown', selector)
	node.addEventListener('touchstart', selector)
}

function pointerCoordinates(e: MouseEvent | TouchEvent): {x: number, y: number} {
	if ('clientX' in e) {
		return {
			x: e.clientX,
			y: e.clientY,
		}
	} else if ('touches' in e) {
		return {
			x: e.touches[0].clientX,
			y: e.touches[0].clientY
		}
	}
}

function handleMousemove(e: MouseEvent) {
	if (selection) {
		handleMove({x: e.clientX, y: e.clientY}, selection)
	}
}

function handleTouchmove(e: TouchEvent) {
	if (selection) {
		handleMove({x: e.touches[0].clientX, y: e.touches[0].clientY}, selection)
	}

	e.preventDefault()
}


let selection: HTMLElement

function select(element: HTMLElement, pointerPostition: { x: number, y: number }) {
	selection = element

	element['anchor'] = {
		x: pointerPostition.x,
		y: pointerPostition.y
	}
}

function handleMove(pointerPostition: {x: number, y: number}, target: HTMLElement) {
	// const target = e.currentTarget as HTMLDivElement
	const position = {
		x: pointerPostition.x - target['anchor'].x,
		y: pointerPostition.y - target['anchor'].y,
	}

	target.dispatchEvent(new CustomEvent('drag', { detail: position }))
}

function deselect() {
	if (selection) {
		selection.dispatchEvent(new CustomEvent('dragend'))
	}
	selection = null
}