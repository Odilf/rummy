import { browser } from '$app/env'
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
			move (event) {
				position.x += event.dx
				position.y += event.dy

				event.target.dispatchEvent(positionEvent('drag', position))
			},

			end (event) {
				position.x = 0
				position.y = 0
				event.target.dispatchEvent(positionEvent('drag', position))
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
			const click = clicks[0]
			click.currentTime = 0
			click.play()
			console.log('Playing', click);
			
			event.target.dispatchEvent( new CustomEvent('drop', { detail: event.relatedTarget['broadcast'] }) )
		},
	})
}

let clicks = browser ? [
	new Audio('/sounds/click1.mp3'),
	new Audio('/sounds/click2.mp3'),
	new Audio('/sounds/click3.mp3'),
	new Audio('/sounds/click4.mp3'),
] : []
