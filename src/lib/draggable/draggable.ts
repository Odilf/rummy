import interact from 'interactjs'

interact.dynamicDrop(true)

interface Position {
	x: number,
	y: number,
}

function positionEvent(eventName: string, position: Position) {
	return new CustomEvent('drag', { detail: { x: position.x, y: position.y }})
}

export function makeDraggable(node: HTMLElement, options: { broadcast: any }) {
	const position = { x: 0, y: 0 }

	node['broadcast'] = options.broadcast

	interact(node).draggable({
		listeners: {
			start (event) {
				console.log(event.type, event.target)
			},
			
			move (event) {
				position.x += event.dx
				position.y += event.dy

				event.target.dispatchEvent(positionEvent('drag', position))
			},

			

			end (event) {
				position.x = 0
				position.y = 0
				event.target.dispatchEvent(positionEvent('dragend', position))	
			}
		}
	})

	node.dispatchEvent(positionEvent('drag', position))


}

export function dropzone(node: HTMLElement) {
	
	interact(node).dropzone({
		ondragenter(event) {
			event.target.dispatchEvent( new CustomEvent('dragenter', { detail: event.relatedTarget['broadcast'] }) )
		},

		ondrop(event) {
			event.target.dispatchEvent( new CustomEvent('drop', { detail: event.relatedTarget['broadcast'] }) )
		},
	})
}

// function drop(e: Event) {
// 	if ('classList' in e.target) {
// 		const target = e.target as HTMLElement
		
// 		console.log(selection);
		
// 		if (selection && target.classList.contains(dragListener)) {
// 			e.target.dispatchEvent(new CustomEvent('dragend', { detail: selection['broadcast'] }))	
// 		} else {
// 			console.log('Deselecting');
			
// 			// deselect()
// 		}
		
// 	} else {
// 		alert('ERROR: classList not in event target')
// 		console.warn(e.target)
// 	}
// }

// export function makeDraggable(node: HTMLElement, options: { broadcast: unknown }) {
// 	function selector (e: MouseEvent | TouchEvent) { 
// 		e.preventDefault()
// 		select(e.currentTarget as HTMLElement, pointerCoordinates(e))
// 	}

// 	node.addEventListener('mousedown', selector)
// 	node.addEventListener('touchstart', selector, { passive: true })

// 	node['broadcast'] = options.broadcast

// 	return {
// 		destroy(): void {
// 			node.removeEventListener('mousedown', selector)
// 			node.removeEventListener('touchstart', selector, true)
// 			// console.warn('SHOULD DO SOMETHING. destroying', node, 'check in `draggable.ts`');
// 		}
// 	}
// }

// function pointerCoordinates(e: MouseEvent | TouchEvent): {x: number, y: number} {
// 	if ('clientX' in e) {
// 		return {
// 			x: e.clientX,
// 			y: e.clientY,
// 		}
// 	} else if ('touches' in e) {
// 		return {
// 			x: e.touches[0].clientX,
// 			y: e.touches[0].clientY
// 		}
// 	}
// }

// function handleMousemove(e: MouseEvent) {
// 	if (selection) {
// 		handleMove({x: e.clientX, y: e.clientY}, selection)
// 	}
// }

// function handleTouchmove(e: TouchEvent): void {
// 	e.preventDefault()

// 	if (selection) {
// 		handleMove({x: e.touches[0].clientX, y: e.touches[0].clientY}, selection)
// 	}
// }



// let selection: HTMLElement

// function select(element: HTMLElement, pointerPostition: { x: number, y: number }) {
// 	selection = element

// 	if (!selection) {
// 		alert('selection is null')
// 	}

// 	element['anchor'] = {
// 		x: pointerPostition.x,
// 		y: pointerPostition.y
// 	}
// }

// function handleMove(pointerPostition: {x: number, y: number}, target: HTMLElement) {
// 	// const target = e.currentTarget as HTMLDivElement
// 	const position = {
// 		x: pointerPostition.x - target['anchor'].x,
// 		y: pointerPostition.y - target['anchor'].y,
// 	}

// 	target.dispatchEvent(new CustomEvent('drag', { detail: position }))
// }

// function deselect() {
// 	// alert('deselecting')
// 	// alert(selection)

// 	if (selection) {
// 		selection.dispatchEvent(new CustomEvent('dragend'))
// 	}
// 	selection = null
// }

// // Listen to drags
// const dragListener = 'drag-listener'

// export function listenToDrags(node: HTMLElement, options: { seeThrough: boolean} = { seeThrough: false }) {
// 	node.classList.add(dragListener)
// 	// console.log('adding node to listener', node, options);

// 	node.addEventListener('mouseup', drop)
// 	// node.addEventListener('touchend', () => alert('caca'))

// 	node.addEventListener('touchstart', console.log)
	
// 	return {
// 		destroy() {
// 			node.classList.remove(dragListener)
// 			node.removeEventListener('mouseup', drop)
// 			node.removeEventListener('touchend', drop)
// 		}
// 	}
// }