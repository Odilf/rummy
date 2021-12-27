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

	console.log('assigning broadcasting', options.broadcast.token, 'to', node);
	
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
			event.target.dispatchEvent( new CustomEvent('drop', { detail: event.relatedTarget['broadcast'] }) )
		},
	})
}