export function range(a: number, b: number = null): number[] {
	const size = b == null ? a : (b - a)
	const adder = b == null ? 0 : a
	return [...Array(size).keys()].map(i => i + adder)
}

function shuffleArray<T>(array: Array<T>) {
	array = [...array]
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]]
	}
	return array
}