
interface SnackbarOptions {
	message: string
	lifetime?: number
	transitionDuration?: number
}

const defualtOptions = {
	lifetime: 1500,
	transitionDuration: 700
}

export function snackbar(node: HTMLElement, options: SnackbarOptions) {
	node.addEventListener('click', () => createSnackbar(options))
}

export function createSnackbar(options: SnackbarOptions) {
	options = Object.assign(defualtOptions, options)
	const { message, lifetime, transitionDuration } = options
	const div = document.createElement('div')
	div.className = 'absolute bg-black p-4 m-4 rounded opacity-80 bottom-0 shadow' // transition-all duration-500'
	div.textContent = message
	
	// div.style.transition = `all 100ms ease-in-out;`
	div.style.transitionDuration = transitionDuration + 'ms'
	div.style.transitionProperty = 'all'

	div.style.transform = 'translateY(20px)'
	div.style.opacity = '0%'
	document.body.append(div)

	setTimeout(() => {
		div.style.transform = ''
		div.style.opacity = '100%'
	})
	
	setTimeout(() => {
		div.style.transform = 'translateY(20px)'
		div.style.opacity = '0%'

	}, transitionDuration + lifetime)

	setTimeout(() => {
		document.body.removeChild(div)
	}, transitionDuration * 2 + lifetime)
}